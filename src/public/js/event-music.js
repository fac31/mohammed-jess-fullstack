import { outputResults } from "./utils.js"
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

// SPOTIFY SEARCH
export async function handlePlaylistsSearch(musicSearchWord) {
  const storedMusic = localStorage.getItem("musicSearchWord")
  if (!musicSearchWord && storedMusic) return
  const playlists = await getPlaylists(musicSearchWord)
  if (musicSearchWord) localStorage.setItem("musicSearchWord", musicSearchWord)
  outputResults("music", playlists)
}

async function getPlaylists(musicSearchWord) {
  const accessToken = localStorage.getItem("access_token")

  if (!accessToken) {
    console.error("No access token found in local storage")
    return []
  }
  try {
    const response = await fetch("/get-playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicSearchWord }),
    })

    if (!response.ok) {
      console.error("Failed to fetch playlists:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.playlists
  } catch (error) {
    console.error("Error fetching playlists:", error)
    return []
  }
}

export function addPlaylistToStorage(playlistName) {
  let storedMusic = JSON.parse(localStorage.getItem("storedmusic")) || []
  if (!storedMusic.includes(playlistName)) {
    storedMusic.push(playlistName)
    localStorage.setItem("storedmusic", JSON.stringify(storedMusic))
  }
}

export function removePlaylistFromStorage(playlistName) {
  let storedMusic = JSON.parse(localStorage.getItem("storedmusic")) || []
  storedMusic = storedMusic.filter((name) => name !== playlistName)
  localStorage.setItem("storedmusic", JSON.stringify(storedMusic))
}

export async function viewPlaylistDetails(playlistName, playlistID) {
  try {
    const response = await fetch("/get-playlist-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistID }),
    })

    if (!response.ok) {
      console.error("Failed to fetch playlist details:", response.statusText)
      return
    }

    const playlistDetails = await response.json()
    displayPlaylistDetails(playlistName, playlistDetails)
  } catch (error) {
    console.error("Error fetching playlist details:", error)
  }
}

function displayPlaylistDetails(playlistName, playlistDetails) {
  overlay.classList.remove("hidden")
  modal.innerHTML = ""
  const songContainer = document.createElement("div")
  modal.appendChild(songContainer)
  songContainer.classList.add("song-container")
  const playlistTitleElement = document.createElement("h2")
  songContainer.appendChild(playlistTitleElement)

  playlistDetails.items.forEach((detail) => {
    const songElement = document.createElement("p")
    const artistElement = document.createElement("span")
    const titleElement = document.createElement("span")
    songElement.appendChild(artistElement)
    songElement.appendChild(titleElement)
    artistElement.style.fontWeight = "bold"
    const artist = detail.track.artists[0].name
    const title = detail.track.name
    playlistTitleElement.textContent = playlistName
    artistElement.textContent = `${artist}   `
    titleElement.textContent = title

    songContainer.appendChild(songElement)
  })
}

overlay.addEventListener("click", closeModal)

function closeModal() {
  overlay.classList.add("hidden")
}

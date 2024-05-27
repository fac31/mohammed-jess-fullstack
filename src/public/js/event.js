import { outputResults } from "./utils.js"
const eventSearchBtn = document.querySelector(".event-form-btn-search")
const eventSearchAgainBtn = document.querySelector(".event-search-again-btn")
const eventForm = document.querySelector(".event-search-form")
const eventSearchContainer = document.querySelector(".event-search-container")
const eventSearchText = document.querySelector(".event-search-text")

eventSearchBtn.addEventListener("click", eventSearch)
eventSearchAgainBtn.addEventListener("click", expandSearchBox)

function hideSearchBox() {
  eventSearchContainer.classList.add("event-search-container-shrink")
  eventForm.classList.add("event-search-form-hidden")
  eventSearchText.classList.add("event-search-text-hidden")
  setTimeout(() => {
    eventSearchAgainBtn.classList.remove("hidden")
    eventSearchAgainBtn.classList.add("fade-in")
    eventSearchAgainBtn.classList.add("visible")
  }, 1000)
}

function expandSearchBox() {
  eventSearchAgainBtn.classList.add("hidden")
  eventSearchAgainBtn.classList.remove("fade-in")
  eventSearchAgainBtn.classList.remove("visible")
  eventSearchContainer.classList.remove("event-search-container-shrink")
  setTimeout(() => {
    eventForm.classList.remove("event-search-form-hidden")
    eventSearchText.classList.remove("event-search-text-hidden")
  }, 1000)
}

function eventSearch(e) {
  e.preventDefault()
  const formData = {}
  const formElements = eventForm.elements

  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i]
    if (element.name) {
      formData[element.name] = element.value
    }
  }

  console.log("Form data:", formData)

  fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data)
    })
    .catch((error) => {
      console.error("Error:", error)
    })

  hideSearchBox()
  handlePlaylistsSearch(formData.music)
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/get-spotify-token")
  const data = await response.json()
  const accessToken = data.access_token
  localStorage.removeItem("musicSearchWord")

  if (accessToken) {
    localStorage.setItem("access_token", accessToken)
  }
})

async function handlePlaylistsSearch(searchWord) {
  const playlists = await getPlaylists(searchWord)
  if (searchWord) localStorage.setItem("musicSearchWord", searchWord)
  outputResults("music", playlists)
}

async function getPlaylists(searchWord) {
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
      body: JSON.stringify({ searchWord }),
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

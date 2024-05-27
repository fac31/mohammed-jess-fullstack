import { handlePlaylistsSearch } from "./event-music.js"
const eventSearchBtn = document.querySelector(".event-form-btn-search")
const eventSearchAgainBtn = document.querySelector(".event-search-again-btn")
const eventForm = document.querySelector(".event-search-form")
const eventSearchContainer = document.querySelector(".event-search-container")
const eventSearchText = document.querySelector(".event-search-text")

eventSearchBtn.addEventListener("click", eventSearch)
eventSearchAgainBtn.addEventListener("click", expandSearchBox)

// HIDE AND EXPAND SEARCH BOX
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

// SEARCH ALL
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

// GET TOKENS
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/get-spotify-token")
  const data = await response.json()
  const accessToken = data.access_token
  localStorage.removeItem("musicSearchWord")

  if (accessToken) {
    localStorage.setItem("access_token", accessToken)
  }
})

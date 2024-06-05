import { handlePlaylistsSearch } from "./event-music.js"
import { handleRecipeSearch } from "./event-food.js"
import { handleDrinksSearch } from "./event-drinks.js"
import { displaySaved } from "./utils.js"
const eventSearchBtn = document.querySelector(".event-form-btn-search")
const eventSearchAgainBtn = document.querySelector(".event-search-again-btn")
const eventForm = document.querySelector(".event-search-form")
const eventSearchContainer = document.querySelector(".event-search-container")
const eventSearchText = document.querySelector(".event-search-text")
const viewEventContainer = document.querySelector(".view-event-container")
const viewEventBtnContainer = document.querySelector(".view-event-btn-container")
const viewEventBtn = document.querySelector(".view-event-btn")
const viewEventBtnClose = document.querySelector(".view-event-btn-close")

eventSearchBtn.addEventListener("click", eventSearch)
eventSearchAgainBtn.addEventListener("click", expandSearchBox)

// Retrieve data from local storage
let storedMusic = localStorage.getItem("storedmusic")
let storedFood = localStorage.getItem("storedfood")
let storedDrinks = localStorage.getItem("storeddrinks")
const storedUser = localStorage.getItem("userId")

// HIDE AND EXPAND SEARCH BOX
function hideSearchBox() {
  const form = document.querySelector(".event-search-form")
  const inputs = form.querySelectorAll('input[type="text"]')
  inputs.forEach((input) => (input.value = ""))

  eventSearchContainer.classList.add("event-search-container-shrink")
  eventForm.classList.add("event-search-form-hidden")
  eventSearchText.classList.add("event-search-text-hidden")
  setTimeout(() => {
    eventSearchAgainBtn.classList.remove("hidden")
    eventSearchAgainBtn.classList.add("fade-in")
    eventSearchAgainBtn.classList.add("visible")
  }, 1000)
  setTimeout(() => {
    viewEventBtnContainer.classList.remove("hidden")
  }, 1500)
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
  handleRecipeSearch(formData.food)
  handleDrinksSearch(formData.drinks)
}

// GET API TOKENS
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/get-spotify-token")
  const data = await response.json()
  const accessToken = data.access_token
  localStorage.removeItem("musicSearchWord")
  localStorage.removeItem("foodSearchWord")

  if (accessToken) {
    localStorage.setItem("access_token", accessToken)
  }
})

// VIEW EVENT
viewEventBtn.addEventListener("click", openEvent)
viewEventBtnClose.addEventListener("click", closeEvent)

function openEvent() {
  viewEventContainer.classList.remove("hidden")
  viewEventContainer.classList.remove("slide-out-diagonal")

  function retrieveLatestData() {
    storedMusic = localStorage.getItem("storedmusic")
    storedFood = localStorage.getItem("storedfood")
    storedDrinks = localStorage.getItem("storeddrinks")
  }

  retrieveLatestData()

  if (storedMusic && storedMusic.length > 0) {
    displaySaved("music", JSON.parse(storedMusic))
  }
  if (storedFood && storedFood.length > 0) {
    displaySaved("food", JSON.parse(storedFood))
  }
  if (storedDrinks && storedDrinks.length > 0) {
    displaySaved("drinks", JSON.parse(storedDrinks))
  }
}

function closeEvent() {
  viewEventContainer.classList.add("slide-out-diagonal")
  setTimeout(() => {
    viewEventContainer.classList.add("hidden")
  }, 500)
}

// SAVE EVENT
const saveInput = document.getElementById("event-name")
const saveButton = document.querySelector(".view-event-btn-save")

// document.addEventListener("DOMContentLoaded", function () {
//   saveButton.addEventListener("click", function () {
//     if (saveInput.value.trim() !== "") {
//       saveButton.disabled = false
//     }
//   })
// })

saveButton.addEventListener("click", saveEvent)

// NOTE - TO BE COMPLETED FOR SAVING EVENT
function saveEvent(e) {
  e.preventDefault()
  const data = {
    profileName: saveInput.value,
    music: storedMusic,
    food: storedFood,
    drinks: storedDrinks,
    user: storedUser,
  }

  // Send data to the server
  fetch("/save-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result)
      window.location.href = `/profile/${storedUser}`
      localStorage.removeItem("storeddrinks")
      localStorage.removeItem("storedmusic")
      localStorage.removeItem("storedfood")
      localStorage.removeItem("drinksSearchWord")
      localStorage.removeItem("musicSearchWord")
      localStorage.removeItem("foodSearchWord")
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

// NAV
const navProfileBtn = document.querySelector(".nav-profile-btn")
const homeIcon = document.querySelector(".home-icon")

navProfileBtn.addEventListener("click", function () {
  const userId = localStorage.getItem("userId")
  window.location.href = `/profile/${userId}`
})

homeIcon.addEventListener("click", function () {
  window.location.href = `/event`
})

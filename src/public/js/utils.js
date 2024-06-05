import { addPlaylistToStorage, removePlaylistFromStorage, viewPlaylistDetails } from "./event-music.js"
import { addRecipeToStorage, removeRecipeFromStorage } from "./event-food.js"
import { addDrinkToStorage, removeDrinkFromStorage, getDrinkDetails } from "./event-drinks.js"

export function outputResults(category, details) {
  const container = document.querySelector(`.${category}-container`)
  const resultsContainer = document.querySelector(`.${category}-results-container`)
  resultsContainer.innerHTML = ""
  const storedMusicSearchWord = localStorage.getItem("musicSearchWord")
  const storedFoodSearchWord = localStorage.getItem("foodSearchWord")
  const storedDrinksSearchWord = localStorage.getItem("drinksSearchWord")

  if (category === "music" && storedMusicSearchWord) {
    container.classList.remove("hidden")
    container.classList.add("fade-in", "visible")
  } else if (category === "food" && storedFoodSearchWord) {
    container.classList.remove("hidden")
    container.classList.add("fade-in", "visible")
  } else if (category === "drinks") {
    container.classList.remove("hidden")
    container.classList.add("fade-in", "visible")
  }

  details.forEach((detail) => {
    const newCard = createCard(category, detail)
    resultsContainer.appendChild(newCard)
  })
}

function createCard(category, card) {
  const cardContainer = document.createElement("div")
  const cardHead = document.createElement("div")
  const cardHeader = document.createElement("h3")
  const cardButtonContainer = document.createElement("div")
  const addButton = document.createElement("button")
  const viewButton = document.createElement("button")
  const cardImg = document.createElement("img")

  const storedItems = JSON.parse(localStorage.getItem(`stored${category}`)) || []
  const isStored = storedItems.some((name) => name === card.name)

  if (isStored) {
    addButton.textContent = "cut"
  } else {
    addButton.textContent = "add"
  }

  if (category === "food") {
    viewButton.textContent = "view"
  } else {
    viewButton.textContent = "more"
  }

  if (category === "music" && card.images.length > 0) {
    cardImg.src = card.images[0].url
    cardHeader.textContent = card.name
  } else if (category === "food") {
    cardImg.src = card.image
    cardHeader.textContent = card.label
  } else if (category === "drinks") {
    cardImg.src = card.strDrinkThumb
    cardHeader.textContent = card.strDrink
  } else {
    cardImg.alt = "No Image"
  }

  cardHead.appendChild(cardImg)
  cardContainer.appendChild(cardHead)
  cardContainer.appendChild(cardHeader)
  cardButtonContainer.appendChild(viewButton)
  cardButtonContainer.appendChild(addButton)
  cardContainer.appendChild(cardButtonContainer)

  cardContainer.classList.add(`${category}-card`)
  cardHead.classList.add(`${category}-card-head`)
  cardHeader.classList.add(`${category}-card-header`)
  cardImg.classList.add(`${category}-card-img`)
  cardButtonContainer.classList.add("card-btn-container")
  addButton.classList.add("card-btn", "btn", "card-btn-add")
  viewButton.classList.add("card-btn", "btn", "card-btn-view")

  if (category === "music") {
    addButton.addEventListener("click", () => {
      if (addButton.textContent === "add") {
        addButton.textContent = "cut"
        addPlaylistToStorage(card.name)
      } else {
        addButton.textContent = "add"
        removePlaylistFromStorage(card.name)
      }
    })
    viewButton.addEventListener("click", () => viewPlaylistDetails(card.name, card.id))
  }

  if (category === "food") {
    addButton.addEventListener("click", () => {
      if (addButton.textContent === "add") {
        addButton.textContent = "cut"
        addRecipeToStorage(card.label)
      } else {
        addButton.textContent = "add"
        removeRecipeFromStorage(card.label)
      }
    })
    viewButton.addEventListener("click", () => {
      window.open(card.url, "_blank")
    })
  }

  if (category === "drinks") {
    addButton.addEventListener("click", () => {
      if (addButton.textContent === "add") {
        addButton.textContent = "cut"
        addDrinkToStorage(card.strDrink)
      } else {
        addButton.textContent = "add"
        removeDrinkFromStorage(card.strDrink)
      }
    })
    viewButton.addEventListener("click", () => getDrinkDetails(card.idDrink))
  }

  return cardContainer
}

export function displaySaved(category, list) {
  const listContainer = document.querySelector(`.${category}-list`)
  listContainer.innerHTML = ""
  list.forEach((item) => {
    const listElement = document.createElement("li")
    listElement.textContent = item
    listContainer.appendChild(listElement)
  })
}

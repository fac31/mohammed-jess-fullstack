import { addPlaylistToEvent, viewPlaylistDetails } from "./event-music.js"

export function outputResults(category, details) {
  const container = document.querySelector(`.${category}-container`)
  const resultsContainer = document.querySelector(
    `.${category}-results-container`
  )
  resultsContainer.innerHTML = ""
  const storedMusicSearchWord = localStorage.getItem("musicSearchWord")

  if (storedMusicSearchWord) {
    container.classList.remove("hidden")
    container.classList.add("fade-in")
    container.classList.add("visible")
  }

  details.forEach((detail) => {
    if (detail.name && !detail.name.toLowerCase().includes("undefined")) {
      const newCard = createCard(category, detail)
      resultsContainer.appendChild(newCard)
    }
  })
}

function createCard(category, card) {
  const cardContainer = document.createElement("div")
  const cardHead = document.createElement("div")
  const cardHeader = document.createElement("h3")
  const cardButtonContainer = document.createElement("div")
  const addButton = document.createElement("button")
  const viewButton = document.createElement("button")

  cardHeader.textContent = card.name
  addButton.textContent = "add"
  viewButton.textContent = "more"

  const cardImg = document.createElement("img")
  if (card.images.length > 0) {
    cardImg.src = card.images[0].url
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
  addButton.classList.add("card-btn")
  addButton.classList.add("card-btn-add")
  viewButton.classList.add("card-btn")
  viewButton.classList.add("card-btn-view")

  if (category === "music") {
    addButton.addEventListener("click", addPlaylistToEvent)
    viewButton.addEventListener("click", () =>
      viewPlaylistDetails(card.name, card.id)
    )
  }

  return cardContainer
}

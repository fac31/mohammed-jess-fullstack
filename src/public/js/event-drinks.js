import { outputResults } from "./utils.js"
const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

export async function handleDrinksSearch(drinksSearchWord) {
  const storedDrinks = localStorage.getItem("drinksSearchWord")
  if (!drinksSearchWord && storedDrinks) return
  const drinks = await getDrinks(drinksSearchWord)
  if (drinksSearchWord) localStorage.setItem("drinksSearchWord", drinksSearchWord)
  outputResults("drinks", drinks)
}

async function getDrinks(drinksSearchWord) {
  try {
    const response = await fetch("/get-drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ drinksSearchWord }),
    })

    if (!response.ok) {
      console.error("Failed to fetch drinks:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.drinks
  } catch (error) {
    console.error("Error fetching drinks:", error)
    return []
  }
}

export function addDrinkToStorage(drinkName) {
  let storedDrinks = JSON.parse(localStorage.getItem("storeddrinks")) || []
  if (!storedDrinks.includes(drinkName)) {
    storedDrinks.push(drinkName)
    localStorage.setItem("storeddrinks", JSON.stringify(storedDrinks))
  }
}

export function removeDrinkFromStorage(drinkName) {
  let storedDrinks = JSON.parse(localStorage.getItem("storeddrinks")) || []
  storedDrinks = storedDrinks.filter((name) => name !== drinkName)
  localStorage.setItem("storeddrinks", JSON.stringify(storedDrinks))
}

export async function getDrinkDetails(drinkID) {
  try {
    const response = await fetch("/get-drink-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ drinkID }),
    })

    if (!response.ok) {
      console.error("Failed to fetch playlist details:", response.statusText)
      return
    }

    const drinkDetails = await response.json()
    displayDrinkDetails(drinkDetails)
  } catch (error) {
    console.error("Error fetching playlist details:", error)
  }
}

function displayDrinkDetails(drinkDetails) {
  overlay.classList.remove("hidden")
  modal.innerHTML = ""
  const drinkContainer = document.createElement("div")
  modal.appendChild(drinkContainer)
  drinkContainer.classList.add("drink-container")

  const drinkTitleElement = document.createElement("h2")
  drinkContainer.appendChild(drinkTitleElement)
  drinkTitleElement.textContent = drinkDetails.name

  const drinkInstructions = document.createElement("p")
  drinkContainer.appendChild(drinkInstructions)
  drinkInstructions.textContent = drinkDetails.instructions

  const drinkIngredientsGrid = document.createElement("div")
  drinkContainer.appendChild(drinkIngredientsGrid)
  drinkIngredientsGrid.classList.add("drink-ingredients-list")

  drinkDetails.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("div")
    ingredientItem.textContent = ingredient.ingredient
    ingredientItem.classList.add("ingredient-item")

    const ingredientMeasure = document.createElement("div")
    ingredientMeasure.textContent = ingredient.measure
    ingredientMeasure.classList.add("ingredient-measure")

    drinkIngredientsGrid.appendChild(ingredientItem)
    drinkIngredientsGrid.appendChild(ingredientMeasure)
  })
}

overlay.addEventListener("click", closeModal)

function closeModal() {
  overlay.classList.add("hidden")
}

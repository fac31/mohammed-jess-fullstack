import { outputResults } from "./utils.js"

export async function handleRecipeSearch(foodSearchWord) {
  const storedFood = localStorage.getItem("foodSearchWord")
  if (!foodSearchWord && storedFood) return
  const recipes = await getRecipes(foodSearchWord)
  if (foodSearchWord) localStorage.setItem("foodSearchWord", foodSearchWord)
  outputResults("food", recipes)
}

async function getRecipes(foodSearchWord) {
  try {
    const response = await fetch("/get-recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodSearchWord }),
    })

    if (!response.ok) {
      console.error("Failed to fetch recipes:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.recipes
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return []
  }
}

export function addRecipeToStorage(recipeName) {
  let storedFood = JSON.parse(localStorage.getItem("storedfood")) || []
  if (!storedFood.includes(recipeName)) {
    storedFood.push(recipeName)
    localStorage.setItem("storedfood", JSON.stringify(storedFood))
  }
}

export function removeRecipeFromStorage(recipeName) {
  let storedFood = JSON.parse(localStorage.getItem("storedfood")) || []
  storedFood = storedFood.filter((name) => name !== recipeName)
  localStorage.setItem("storedfood", JSON.stringify(storedFood))
}

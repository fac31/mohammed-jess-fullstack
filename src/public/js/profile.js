// NAV
document.addEventListener("DOMContentLoaded", () => {
  const navProfileBtn = document.querySelector(".nav-profile-btn")

  navProfileBtn.addEventListener("click", function () {
    const userId = localStorage.getItem("userId")
    if (userId) {
      window.location.href = `/profile/${userId}`
    } else {
      console.error("User ID not found in localStorage")
    }
  })

  // Fetch and display user events if on profile page
  const profilePageMatch = window.location.pathname.match(/\/profile\/(.+)/)
  if (profilePageMatch) {
    const userId = profilePageMatch[1]
    fetchUserEvents(userId)
  }
})

async function fetchUserEvents(userId) {
  try {
    const response = await fetch(`/profile/${userId}/events`)
    if (!response.ok) {
      throw new Error("Failed to fetch events")
    }
    const eventsData = await response.json()
    renderEventCards(eventsData)
  } catch (error) {
    console.error("Error:", error.message)
  }
}

function renderEventCards(events) {
  const eventsListContainer = document.querySelector("#events-list-container")
  eventsListContainer.innerHTML = "" // Clear existing events

  events.forEach((event) => {
    const eventCard = document.createElement("div")
    eventCard.classList.add("event-card")

    const eventName = document.createElement("h2")
    eventName.textContent = event.eventName
    eventCard.appendChild(eventName)

    if (event.music) {
      const musicHeader = document.createElement("h3")
      musicHeader.textContent = "Music:"
      eventCard.appendChild(musicHeader)

      const musicList = document.createElement("ul")
      JSON.parse(event.music).forEach((musicItem) => {
        const musicListItem = document.createElement("li")
        musicListItem.textContent = musicItem
        musicList.appendChild(musicListItem)
      })
      eventCard.appendChild(musicList)
    }

    if (event.food) {
      const foodHeader = document.createElement("h3")
      foodHeader.textContent = "Food:"
      eventCard.appendChild(foodHeader)

      const foodList = document.createElement("ul")
      JSON.parse(event.food).forEach((foodItem) => {
        const foodListItem = document.createElement("li")
        foodListItem.textContent = foodItem
        foodList.appendChild(foodListItem)
      })
      eventCard.appendChild(foodList)
    }

    if (event.drink) {
      const drinksHeader = document.createElement("h3")
      drinksHeader.textContent = "Drinks:"
      eventCard.appendChild(drinksHeader)

      const drinksList = document.createElement("ul")
      JSON.parse(event.drink).forEach((drinkItem) => {
        const drinksListItem = document.createElement("li")
        drinksListItem.textContent = drinkItem
        drinksList.appendChild(drinksListItem)
      })
      eventCard.appendChild(drinksList)
    }

    eventsListContainer.appendChild(eventCard)
  })
}

// NAV
const homeIcon = document.querySelector(".home-icon")

homeIcon.addEventListener("click", function () {
  window.location.href = `/event`
})


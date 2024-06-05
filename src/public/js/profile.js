// NAV
const navProfileBtn = document.querySelector(".nav-profile-btn")
const homeIcon = document.querySelector(".home-icon")

homeIcon.addEventListener("click", function () {
  window.location.href = `/event`
})

//----------------------------------------Function to fetch events data---------------------
function fetchEvents() {
  const userId = localStorage.getItem("userId")

  fetch(`/profile/${userId}`)
    .then((response) => response.json())
    .then((events) => {
      if (events.length === 0) {
        document.body.innerHTML = "<h1>No events found for this user</h1>"
        return
      }

      const userName = events[0].user.name
      document.getElementById("user-name").innerText = userName
      const eventsList = document.getElementById("events-list")
      console.log(events)
      events.forEach((event) => {
        const listItem = document.createElement("li")
        listItem.innerHTML = `<strong>Event Name:</strong> ${event.eventName} <br> 
        <strong>Music:</strong> ${event.music ? event.music : "Not specified"} <br> 
        <strong>Food:</strong> ${event.food ? event.food : "Not specified"} <br> 
        <strong>Drinks:</strong> ${event.drink ? event.drink : "Not specified"} <br>`
        eventsList.appendChild(listItem)
      })
    })
    .catch((error) => {
      console.error("Error fetching events:", error)
    })
}

// Call fetchEvents function when the page loads
window.addEventListener("load", fetchEvents)

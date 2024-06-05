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

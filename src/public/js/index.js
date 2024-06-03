const startBtn = document.querySelector(".start-btn")
const homeContainer = document.querySelector(".home-container")
const pinkSection = document.querySelector(".pink-section")
const formSection = document.querySelector(".form-section")
const greenSection = document.querySelector(".green-section")
const waveSectionTop = document.querySelector(".wave-section-top")
const waveSectionBtm = document.querySelector(".wave-section-btm")
const sloganTxt = document.querySelector(".slogan-text")
const actionBtn = document.querySelector(".start-btn")
const loginMessage = document.querySelector(".login-message")
const loginMessageText = document.querySelector(".login-message p")
const showLoginLink = document.getElementById("show-login")
const logForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")
const links = document.querySelectorAll(".link")

startBtn.addEventListener("click", transformPage)

// Transform / expand homepage element on Get Started button click
function transformPage() {
  homeContainer.classList.add("home-container-transform")
  pinkSection.classList.add("pink-section-transform")
  formSection.classList.add("form-section-transform")
  greenSection.classList.add("green-section-transform")
  waveSectionTop.classList.add("wave-section-top-transform")
  waveSectionBtm.classList.add("wave-section-btm-transform")
  formSection.classList.remove("hide-form-section")
  showLoginLink.focus()
  sloganTxt.classList.add("hidden")
  actionBtn.classList.add("hidden")
}

//Toggle Login And signup form
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault() //preventing form submit
    if (link.id === "show-signup") {
      logForm.classList.add("hidden")
      signupForm.classList.remove("hidden")
    } else if (link.id === "show-login") {
      signupForm.classList.add("hidden")
      logForm.classList.remove("hidden")
    }
  })
})

// Initially show the login form and hide the signup form
logForm.classList.remove("hidden")
signupForm.classList.add("hidden")

const emailField = document.getElementById("emailField")
const passwordField = document.getElementById("passwordField")

function showFormMessage(message) {
  loginMessage.classList.add("visible")
  loginMessageText.innerText = message
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm")
  const loginForm = document.getElementById("loginForm")

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault()
      const formData = new FormData(registerForm)
      fetch("/register", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((message) => {
          showFormMessage(message)
        })
        .catch((error) => {
          showFormMessage("An error occurred: " + error.message)
        })
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault()
      const formData = new FormData(loginForm)
      fetch("/login", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/event"
          } else {
            return response.text().then((message) => {
              showFormMessage(message)
            })
          }
        })
        .catch((error) => {
          showFormMessage("An error occurred: " + error.message)
        })
    })
  }
})
//.

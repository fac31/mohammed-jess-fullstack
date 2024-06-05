const startBtn = document.querySelector(".start-btn")
const homeContainer = document.querySelector(".home-container")
const pinkSection = document.querySelector(".pink-section")
const formSection = document.querySelector(".form-section")
const greenSection = document.querySelector(".green-section")
const waveSectionTop = document.querySelector(".wave-section-top")
const waveSectionBtm = document.querySelector(".wave-section-btm")
const sloganTxt = document.querySelector(".slogan-text")
const actionBtn = document.querySelector(".start-btn")
const showLoginLink = document.getElementById("show-login")
const logForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")
const logFormData = document.getElementById("login-form-data")
const signupFormData = document.getElementById("signup-form-data")
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

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup-form form")
  const loginForm = document.querySelector("#login-form form")
  const loginMessage = document.querySelector(".login-message")
  const loginMessageText = document.querySelector(".login-message-text")

  function showFormMessage(message) {
    loginMessage.classList.remove("hidden")
    loginMessageText.innerText = message
  }

  function saveUserIdToLocalStorage(userId) {
    localStorage.setItem("userId", userId)
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault()
      const formData = new FormData(signupFormData)
      try {
        const response = await fetch("/register", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const { userId, redirectUrl } = await response.json()
          saveUserIdToLocalStorage(userId)
          window.location.href = redirectUrl
        } else {
          const message = await response.text()
          showFormMessage(message)
        }
      } catch (error) {
        showFormMessage("An error occurred: " + error.message)
      }
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault()
      const formData = new FormData(loginForm)
      try {
        const response = await fetch("/login", {
          method: "POST",
          body: formData,
        })

        console.log(response)

        if (response.ok) {
          const { userId, redirectUrl } = await response.json()
          console.log(userId, redirectUrl)
          saveUserIdToLocalStorage(userId)
          window.location.href = redirectUrl
        } else {
          const message = await response.text()
          console.log(message)
          showFormMessage(message)
        }
      } catch (error) {
        showFormMessage("An error occurred: " + error.message)
      }
    })
  }
})

// document.addEventListener("DOMContentLoaded", () => {
//   if (signupForm) {
//     signupForm.addEventListener("submit", function (event) {
//       event.preventDefault()
//       const formData = new FormData(signupFormData)
//       fetch("/register", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.text())
//         .then((message) => {
//           showFormMessage(message)
//         })
//         .catch((error) => {
//           showFormMessage("An error occurred: " + error.message)
//         })
//     })
//   }

//   if (logForm) {
//     logForm.addEventListener("submit", function (event) {
//       event.preventDefault()
//       const formData = new FormData(logFormData)
//       fetch("/login", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           if (response.ok) {
//             window.location.href = "/event"
//           } else {
//             return response.text().then((message) => {
//               showFormMessage(message)
//             })
//           }
//         })
//         .catch((error) => {
//           showFormMessage("An error occurred: " + error.message)
//         })
//     })
//   }
// })

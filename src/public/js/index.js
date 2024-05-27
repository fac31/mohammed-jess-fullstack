const startBtn = document.querySelector('.start-btn')
const pinkSection = document.querySelector('.pink-section')
const formSection = document.querySelector('.form-section')
const greenSection = document.querySelector('.green-section')
const waveSectionTop = document.querySelector('.wave-section-top')
const waveSectionBtm = document.querySelector('.wave-section-btm')
const sloganTxt = document.querySelector('.slogan-text')
const actionBtn = document.querySelector('.start-btn')

const showLoginLink = document.getElementById('show-login')
const loginForm = document.getElementById('login-form')
const signupForm = document.getElementById('signup-form')
const links = document.querySelectorAll('.link')

startBtn.addEventListener('click', transformPage)

function transformPage() {
    pinkSection.classList.add('pink-section-transform')
    formSection.classList.add('form-section-transform')
    greenSection.classList.add('green-section-transform')
    waveSectionTop.classList.add('wave-section-top-transform')
    waveSectionBtm.classList.add('wave-section-btm-transform')
    formSection.classList.remove('hide-form-section')
    showLoginLink.focus()
    sloganTxt.classList.add('hideElement')
    actionBtn.classList.add('hideElement')
}

//Toggle Login And signup form
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault() //preventing form submit
        if (link.id === 'show-signup') {
            loginForm.classList.add('hideElement')
            signupForm.classList.remove('hideElement')
        } else if (link.id === 'show-login') {
            signupForm.classList.add('hideElement')
            loginForm.classList.remove('hideElement')
        }
    })
})

// Initially show the login form and hide the signup form
loginForm.classList.remove('hideElement')
signupForm.classList.add('hideElement')

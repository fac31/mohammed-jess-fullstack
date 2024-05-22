const startBtn = document.querySelector(".start-btn");
const pinkSection = document.querySelector(".pink-section");
const formSection = document.querySelector(".form-section");
const greenSection = document.querySelector(".green-section");
const waveSectionTop = document.querySelector(".wave-section-top");
const waveSectionBtm = document.querySelector(".wave-section-btm");

startBtn.addEventListener("click", transformPage);

function transformPage() {
  pinkSection.classList.add("pink-section-transform");
  formSection.classList.add("form-section-transform");
  greenSection.classList.add("green-section-transform");
  waveSectionTop.classList.add("wave-section-top-transform");
  waveSectionBtm.classList.add("wave-section-btm-transform");
}

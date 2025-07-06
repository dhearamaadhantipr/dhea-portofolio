function opentab(tabName) {
  const tabContents = document.querySelectorAll(".tab-contents");
  const tabLinks = document.querySelectorAll(".tab-links");

  tabContents.forEach((content) => {
    content.classList.remove("active-tab");
  });

  tabLinks.forEach((link) => {
    link.classList.remove("active-link");
  });

  document.getElementById(tabName).classList.add("active-tab");
  document
    .querySelector(`.tab-links[onclick="opentab('${tabName}')"]`)
    .classList.add("active-link");
}

function openMenu() {
  document.getElementById("side-menu").style.right = "0";
}

function closeMenu() {
  document.getElementById("side-menu").style.right = "-200px";
}

function moveSlide(button, direction) {
  const wrapper = button.closest(".slider-wrapper");
  const slides = wrapper.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  const imageWidth = images[0].clientWidth;
  let currentTransform = getComputedStyle(slides).transform;
  let matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
  let currentX = matrixValues ? parseFloat(matrixValues[1].split(", ")[4]) : 0;
  let currentIndex = Math.round(-currentX / imageWidth);

  let newIndex = currentIndex + direction;
  const maxIndex = images.length - 1;

  if (newIndex > maxIndex) newIndex = 0;
  if (newIndex < 0) newIndex = maxIndex;

  slides.style.transform = `translateX(${-newIndex * imageWidth}px)`;
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxwyj7KNCwh08NJuznIK6KQYSV_YIkr4Dg62s4S-BfWQqbIWPeA_TuMUzagGjoYM1pN/exec";
const form = document.forms["submit-to-google-sheet"];
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      successMessage.textContent = "Your message has been sent successfully!";
      setTimeout(() => {
        successMessage.textContent = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

document.addEventListener("scroll", function () {
  let element = document.querySelector(".element");
  let position = element.getBoundingClientRect().top;
  let screenPosition = window.innerHeight / 1.5;

  if (position < screenPosition) {
    element.classList.add("visible");
  }
});
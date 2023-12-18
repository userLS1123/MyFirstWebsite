// Name: Chew Shu Wen
// Admin number: p227423
// Class: DISM1A/05 

const scrollElements = document.querySelectorAll(".js-scroll");

// Function to check if an element is in view
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

// Function to check if an element is out of view
const elementOutOfView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

// Function to display the element and apply animation
const displayElement = (element) => {
  element.classList.add("scrolled");
  element.classList.add("rotate-center"); // Add the rotate-center class when element is in view
};

// Function to hide the element and remove animation
const hideElement = (element) => {
  element.classList.remove("scrolled");
  element.classList.remove("rotate-center"); // Remove the rotate-center class when element is out of view
};

// Function to handle scroll animation for the elements
const handleScrollAnimation = () => {
  const elements = document.querySelectorAll('.js-scroll');
  const cards = document.querySelectorAll('.reveal .card img');

  elements.forEach((element) => {
    if (elementInView(element, 1.25)) {
      displayElement(element);
    } else if (elementOutOfView(element)) {
      hideElement(element);
    }
  });

  cards.forEach((card) => {
    if (elementInView(card, 1.25)) {
      displayElement(card);
    } else if (elementOutOfView(card)) {
      hideElement(card);
    }
  });
};
// Event listener for scroll - triggers handleScrollAnimation function
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});












  




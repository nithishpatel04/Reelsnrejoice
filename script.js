const phrases = [
  "Birthday",
  "Anniversary",
  "Bride to be",
  "Mom to be",
  "Farewell"
];

document.addEventListener("DOMContentLoaded", () => {
  // Typing effect
  const el = document.getElementById("typed-text");
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;

  function type() {
    const fullText = phrases[currentPhrase];
    if (isDeleting) {
      currentChar--;
    } else {
      currentChar++;
    }

    el.textContent = fullText.substring(0, currentChar);

    let typingSpeed = isDeleting ? 70 : 120;

    if (!isDeleting && currentChar === fullText.length) {
      typingSpeed = 1500; // pause at end
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector("#nav-menu ul");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

 
});


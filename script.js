function toggleMenu() {
  const nav = document.getElementById('navbar');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  nav.classList.toggle('active');
  if (nav.classList.contains('active')) {
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-times');
  } else {
    hamburgerIcon.classList.remove('fa-times');
    hamburgerIcon.classList.add('fa-bars');
  }
}


function closeMenu() {
  const nav = document.getElementById('navbar');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  nav.classList.remove('active');
  hamburgerIcon.classList.remove('fa-times');
  hamburgerIcon.classList.add('fa-bars');
}


const typingAnimationElement = document.getElementById('typing-animation');
const words = ["Developer", "Coder", "Student"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 50;
const pauseBetweenWords = 1200;
const fadeDuration = 250;


function setTextWithFade(text, fadeIn, cb) {
  if (fadeIn) {
    typingAnimationElement.style.transition = `opacity ${fadeDuration}ms`;
    typingAnimationElement.style.opacity = 0;
    setTimeout(() => {
      typingAnimationElement.textContent = text;
      typingAnimationElement.style.opacity = 1;
      setTimeout(() => {
        if (cb) cb();
      }, fadeDuration);
    }, 0);
  } else {
    typingAnimationElement.textContent = text;
    if (cb) cb();
  }
}

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    setTextWithFade(currentWord.substring(0, charIndex + 1), charIndex === 0, () => {
      charIndex++;
      if (charIndex === currentWord.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseBetweenWords);
      } else {
        setTimeout(type, typingSpeed);
      }
    });
  } else {
    setTextWithFade(currentWord.substring(0, charIndex - 1), false, () => {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, deletingSpeed);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Fix height to prevent up-down jump
  typingAnimationElement.style.display = 'inline-block';
  typingAnimationElement.style.minHeight = '2.2em';
  typingAnimationElement.style.opacity = 0;
  setTimeout(type, 500);
});



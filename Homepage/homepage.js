/*
   HOPAPCU HOMEPAGE JAVASCRIPT
   Handles: fade-in animations, mobile menu, partners carousel
*/

/* Fade-in on scroll */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* Mobile hamburger menu */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
    });
  });
}


/* Partners carousel pause/resume */
const partnersCarousel = document.getElementById('partnersCarousel');
const partnersScroll = document.getElementById('partnersScroll');

if (partnersCarousel && partnersScroll) {
  partnersCarousel.addEventListener('mouseenter', () => {
    partnersScroll.style.animationPlayState = 'paused';
  });

  partnersCarousel.addEventListener('mouseleave', () => {
    partnersScroll.style.animationPlayState = 'running';
  });

  partnersCarousel.addEventListener('focusin', () => {
    partnersScroll.style.animationPlayState = 'paused';
  });

  partnersCarousel.addEventListener('focusout', () => {
    partnersScroll.style.animationPlayState = 'running';
  });
}


/* Gallery carousel arrow controls */
const galleryScroll = document.getElementById('galleryScroll');
const galleryArrowLeft = document.querySelector('.gallery-arrow-left');
const galleryArrowRight = document.querySelector('.gallery-arrow-right');

if (galleryScroll && galleryArrowLeft && galleryArrowRight) {
  const scrollAmount = 320;

  galleryArrowLeft.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  galleryArrowRight.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}
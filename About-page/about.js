/*
  Fade-in on scroll.
  Watches all .fade-in elements.
  Adds .visible class when element enters the viewport.
  CSS handles the actual transition.
*/
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


/*
  Hamburger menu toggle with auto-close on link click
*/
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


/*
  Gallery modal — click thumbnail to view full image
*/
const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

if (galleryThumbnails.length > 0 && imageModal && modalImage && modalClose) {
  galleryThumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      modalImage.src = thumb.src;
      imageModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', () => {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
}


/*
  Partners carousel pause/resume on hover or focus
*/
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
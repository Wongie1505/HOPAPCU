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
  Hamburger menu toggle
*/
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
});

/*
  Gallery modal — click thumbnail to view full image
*/
const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

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

/*
  Partners carousel auto-scroll pause/resume on scroll
  Pauses when user manually scrolls, resumes when they click elsewhere
*/
const partnersCarousel = document.getElementById('partnersCarousel');
const partnersScroll = document.getElementById('partnersScroll');

if (partnersCarousel && partnersScroll) {
  let isScrolling = false;

  // Detect manual scroll
  partnersScroll.addEventListener('scroll', () => {
    if (!isScrolling) {
      partnersScroll.style.animationPlayState = 'paused';
      isScrolling = true;
    }
  });

  // Resume when user clicks elsewhere on the page
  document.addEventListener('click', (e) => {
    if (isScrolling && !partnersCarousel.contains(e.target)) {
      partnersScroll.style.animationPlayState = 'running';
      isScrolling = false;
    }
  });

  // Also resume if they click inside carousel (but not scroll)
  partnersCarousel.addEventListener('click', () => {
    if (isScrolling) {
      partnersScroll.style.animationPlayState = 'running';
      isScrolling = false;
    }
  });
}
/*
  Fade-in on scroll
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
  Hamburger menu with auto-close on link click
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
  Gallery modal lightbox
*/
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imageSrc = item.getAttribute('data-image');
    modalImage.src = imageSrc;
    modal.classList.add('active');
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});
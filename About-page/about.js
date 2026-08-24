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
alert("boilerplate information")
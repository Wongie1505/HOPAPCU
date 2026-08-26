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
            // Stop watching once visible — no need to re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-open');
});

/*
  Partners carousel auto-scroll pause/resume on scroll
  Pauses when user manually scrolls, resumes when they click elsewhere
*/
const partnersCarousel = document.getElementById('partnersCarousel');
const partnersScroll = document.getElementById('partnersScroll');

if (partnersCarousel && partnersScroll) {
  let isScrolling = false;

  partnersScroll.addEventListener('scroll', () => {
    if (!isScrolling) {
      partnersScroll.style.animationPlayState = 'paused';
      isScrolling = true;
    }
  });

  document.addEventListener('click', (e) => {
    if (isScrolling && !partnersCarousel.contains(e.target)) {
      partnersScroll.style.animationPlayState = 'running';
      isScrolling = false;
    }
  });

  partnersCarousel.addEventListener('click', () => {
    if (isScrolling) {
      partnersScroll.style.animationPlayState = 'running';
      isScrolling = false;
    }
  });
}
/*
  Contact form handling and fade-in animations
*/

// Fade-in on scroll
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


// Hamburger menu with auto-close on link click
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


// Contact form submission (mailto)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const inquiryType = document.getElementById('inquiry-type').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !inquiryType || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const subject = `HOPAPCU Contact: ${inquiryType} from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:info@hopapcu.mw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
}
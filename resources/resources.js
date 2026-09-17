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


/* Hamburger menu */
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


/* Book Order Modal */
const orderModal = document.getElementById('orderModal');
const orderModalClose = document.querySelector('#orderModal .modal-close');
const orderForm = document.getElementById('orderForm');
const submitBtn = orderForm.querySelector('button[type="submit"]');
const orderButtons = document.querySelectorAll('.btn-order-now');

const productName = document.getElementById('productName');
const productId = document.getElementById('productId');

orderButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const productDataId = button.getAttribute('data-product');
    const bookCard = button.closest('.book-card');
    const bookTitle = bookCard.querySelector('.book-name').textContent;
    
    productName.value = bookTitle;
    productId.value = productDataId;
    
    orderModal.classList.add('show');
  });
});

if (orderModalClose) {
  orderModalClose.addEventListener('click', () => {
    orderModal.classList.remove('show');
  });
}

if (orderModal) {
  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
      orderModal.classList.remove('show');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    orderModal.classList.remove('show');
  }
});


/* Book Order Form Submission */
if (orderForm) {
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(orderForm);

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your order has been submitted. We'll contact you shortly.");
        orderForm.reset();
        orderModal.classList.remove('show');
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }

    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error('Error:', error);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}


/* Gallery Lightbox - Click to view full width */
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const galleryModalImg = document.getElementById('modalImage');
const galleryModalClose = document.querySelector('#galleryModal .modal-close');

galleryItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const imageSrc = item.getAttribute('data-image');
    if (imageSrc && galleryModalImg) {
      galleryModalImg.src = imageSrc;
      galleryModal.classList.add('show');
    }
  });
});

if (galleryModalClose) {
  galleryModalClose.addEventListener('click', () => {
    galleryModal.classList.remove('show');
  });
}

if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('show');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    galleryModal.classList.remove('show');
  }
});
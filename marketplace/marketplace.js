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
  Order Modal Management
  Opens when user clicks "Order Now" on a product
*/
const modal = document.getElementById('orderModal');
const modalClose = document.getElementById('modalClose');
const orderForm = document.getElementById('orderForm');
const submitBtn = orderForm.querySelector('button[type="submit"]');
const orderButtons = document.querySelectorAll('.btn-order-now');

const productName = document.getElementById('productName');
const productId = document.getElementById('productId');

// Open modal when "Order Now" button is clicked
orderButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get the product ID from the button's data attribute
    const productDataId = button.getAttribute('data-product');
    
    // Find the product card to get the product name
    const productCard = button.closest('.product-card');
    const productTitle = productCard.querySelector('.product-name').textContent;
    
    // Fill in the form with product info
    productName.value = productTitle;
    productId.value = productDataId;
    
    // Show the modal
    modal.classList.add('show');
  });
});

// Close modal when X button is clicked
modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  }
});


/*
  Order Form Submission with Web3Forms
  Collects form data and sends to email
*/
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
      alert("Success! Your order has been submitted. We'll contact you shortly to confirm.");
      orderForm.reset();
      modal.classList.remove('show');
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
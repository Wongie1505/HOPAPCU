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
  Order Form Submission
  Collects form data and sends to email
*/
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Collect all form data
  const formData = {
    productId: document.getElementById('productId').value,
    productName: document.getElementById('productName').value,
    name: document.getElementById('orderName').value,
    email: document.getElementById('orderEmail').value,
    phone: document.getElementById('orderPhone').value,
    organization: document.getElementById('orderOrg').value || 'Not provided',
    quantity: document.getElementById('orderQuantity').value,
    delivery: document.getElementById('orderDelivery').value,
    message: document.getElementById('orderMessage').value || 'No special requests',
  };
  
  // Create email subject line
  const emailSubject = `HOPAPCU Product Order: ${formData.productName} - ${formData.productId}`;
  
  // Create email body
  const emailBody = `
New Product Order Received

PRODUCT DETAILS:
Product: ${formData.productName}
Product ID: ${formData.productId}
Quantity: ${formData.quantity}

CUSTOMER INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Organization: ${formData.organization}

ORDER PREFERENCES:
Delivery Method: ${formData.delivery}

SPECIAL REQUESTS:
${formData.message}

---
This order was submitted via the HOPAPCU Marketplace.
Please contact the customer to confirm availability and arrange payment/delivery.
`;
  
  // Create mailto link with all details
  const mailtoLink = `mailto:info@hopapcu.mw?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  // Open default email client with pre-filled message
  window.location.href = mailtoLink;
  
  // Close the modal after a short delay
  setTimeout(() => {
    modal.classList.remove('show');
    orderForm.reset();
  }, 500);
});
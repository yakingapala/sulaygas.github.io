document.addEventListener('DOMContentLoaded', () => {
 
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    function showModal(contentHtml) {
        if (contentHtml) {
            document.getElementById('modal-body').innerHTML = contentHtml;
        }
        modal.style.display = 'flex';
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // buttons for  products
    const orderButtons = document.querySelectorAll('.btn-order');
    const interestSelect = document.getElementById('interest');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            
            // scroll to order form
            const orderSection = document.getElementById('order');
            orderSection.scrollIntoView({ behavior: 'smooth' });

            // set the dropdown selection based on product
            if (productName.includes('2.7kg Compact')) interestSelect.value = '2.7kg';
            else if (productName.includes('2.7kg Gasulette')) interestSelect.value = '2.7kg-gasulette';
            else if (productName.includes('11kg gasul')) interestSelect.value = '11kg gasul';
            else if (productName.includes('11kg shine gas')) interestSelect.value = '11kg shine gas';

            // visual feedback 
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 800);
        });
    });

   // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const number = document.getElementById('number').value.trim();
        const interest = document.getElementById('interest').value;
        const quantity = document.getElementById('quantity').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !number || !interest || !quantity || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Phone number validation (simple)
        if (number.length < 10) {
            alert('Please enter a valid phone number (at least 10 digits).');
            return;
        }

        // Quantity validation
        if (quantity < 1 || quantity > 10) {
            alert('Please enter a quantity between 1 and 10.');
            return;
        }

        // Calculate price based on selection
        let price = 0;
        let productName = '';
        
        switch(interest) {
            case '2.7kg':
                price = 280 * quantity;
                productName = '2.7kg Compact Tank';
                break;
            case '2.7kg-gasulette':
                price = 295 * quantity;
                productName = '2.7kg Gasulette';
                break;
            case '7kg':
                price = 730 * quantity;
                productName = '7kg Medium Tank';
                break;
            case '11kg':
                price = 1120 * quantity;
                productName = '11kg Family Tank';
                break;
            default:
                alert('Please select a tank size.');
                return;
        }

        // Show success modal with order summary
        showModal(`
            <div class="text-center">
                <div class="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0056b3" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                </div>
                <h3 style="color: #0056b3; margin-bottom: 1rem;">Order Confirmed!</h3>
                <p>Thank you <strong>${name}</strong> for your order!</p>
                <div class="order-summary mt-3 p-3 bg-light rounded">
                    <h5>Order Summary:</h5>
                    <p><strong>Product:</strong> ${productName}</p>
                    <p><strong>Quantity:</strong> ${quantity}</p>
                    <p><strong>Total Amount:</strong> ₱${price.toFixed(2)}</p>
                    <p><strong>Payment:</strong> Cash on Delivery</p>
                    <p><strong>Delivery Address:</strong><br>${message}</p>
                    <p><small>We will contact you at <strong>${number}</strong> to confirm your order.</small></p>
                </div>
                <button class="btn btn-primary mt-3" onclick="document.getElementById('modal').style.display='none'">Close</button>
            </div>
        `);
        
        // Reset form
        contactForm.reset();
        
        // Reset quantity to 1
        document.getElementById('quantity').value = 1;
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.4rem 0';
            navbar.classList.add('shadow');
        } else {
            navbar.style.padding = '0.75rem 0';
            navbar.classList.remove('shadow');
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Close offcanvas when clicking a nav link
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });

    // Modal Control
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

    // Handle Order Buttons
    const orderButtons = document.querySelectorAll('.btn-order');
    const interestSelect = document.getElementById('interest');

    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            
            // Scroll to order form
            const orderSection = document.getElementById('order');
            orderSection.scrollIntoView({ behavior: 'smooth' });

            // Set the dropdown selection
            if (productName.includes('2.7kg')) interestSelect.value = '2.7kg';
            else if (productName.includes('7kg')) interestSelect.value = '7kg';
            else if (productName.includes('11kg')) interestSelect.value = '11kg';

            // Visual feedback - focus on name field
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 800);
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation check
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && number && message) {
            // Show success modal
            showModal(`
                <h3 style="color: #0056b3; margin-bottom: 1rem;">Thank You, ${name.split(' ')[0]}!</h3>
                <p>Your request has been received. Our team will contact you at <strong>${email}</strong> regarding your inquiry.</p>
                <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="document.getElementById('modal').style.display='none'">Close</button>
            `);
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
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
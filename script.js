/**
 * FizjoTerapia UK - Physiotherapy Clinic Landing Page Scripts
 * Created: 2023
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTestimonialSlider();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimation();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnMenuBtn && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Add mobile menu styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                nav ul.active {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: white;
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    z-index: 1000;
                }
                
                nav ul.active li {
                    margin: 10px 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Testimonial Slider Functionality
 */
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    if (testimonialCards.length > 0 && dots.length > 0) {
        // Hide all slides except the first one
        testimonialCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Function to show a specific slide
        function showSlide(index) {
            testimonialCards.forEach(card => {
                card.style.display = 'none';
                card.style.opacity = '0';
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonialCards[index].style.display = 'block';
            
            // Trigger reflow for animation
            void testimonialCards[index].offsetWidth;
            
            testimonialCards[index].style.opacity = '1';
            testimonialCards[index].style.transition = 'opacity 0.5s ease';
            
            dots[index].classList.add('active');
            currentSlide = index;
        }
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.querySelector('nav ul');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Calculate header height for offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Scroll to target with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Submission
 */
function initContactForm() {
    const form = document.getElementById('appointment-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Validate form (simple validation)
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            
            // Clear form
            form.reset();
            
            // Show success message
            showFormMessage('Thank you! Your appointment request has been submitted. We will contact you shortly.', 'success');
        });
        
        // Add form message container if it doesn't exist
        if (!document.querySelector('.form-message')) {
            const messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            form.appendChild(messageContainer);
            
            // Add styles for form messages
            const style = document.createElement('style');
            style.textContent = `
                .form-message {
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 5px;
                    display: none;
                }
                
                .form-message.success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    display: block;
                }
                
                .form-message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    display: block;
                }
                
                .error {
                    border-color: #dc3545 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

/**
 * Show form submission message
 */
function showFormMessage(message, type) {
    const messageContainer = document.querySelector('.form-message');
    
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = 'form-message';
        messageContainer.classList.add(type);
        
        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 5000);
        }
    }
}

/**
 * Scroll Animation for Elements
 */
function initScrollAnimation() {
    // Add fade-in animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-box, .service-card, .about-content, .testimonial-card');
    
    // Add initial styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add fade-in class to elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check if elements are in viewport on scroll
    function checkVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // How far from the top before the element becomes visible
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on initial load
    checkVisibility();
    
    // Run on scroll
    window.addEventListener('scroll', checkVisibility);
}

/**
 * Header Scroll Effect
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

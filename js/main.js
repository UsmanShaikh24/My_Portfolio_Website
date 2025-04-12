// Remove Certificate Modal Functions
function openModal() { return; }
function closeModal() { return; }

document.addEventListener('DOMContentLoaded', () => {
    // Wait for fonts to load before starting animations
    document.fonts.ready.then(() => {
        // Text animation for hero section
        function initTextAnimation() {
            const h1 = document.querySelector('.profile-text h1');
            const tagline = document.querySelector('.profile-text .tagline');
            const description = document.querySelector('.profile-description');
            const buttons = document.querySelector('.hero-buttons');

            if (h1 && tagline && description) {
                // Split text into spans for animation
                const h1Text = h1.textContent;
                h1.innerHTML = `<span class="typing-container"><span class="typing-text">${h1Text}</span></span>`;
                
                // Add delayed-text class to other elements
                tagline.classList.add('delayed-text');
                description.classList.add('delayed-text');
                if (buttons) buttons.classList.add('delayed-text');

                // Start animation sequence
                setTimeout(() => {
                    document.querySelector('.typing-container').classList.add('visible');
                }, 500);

                setTimeout(() => {
                    tagline.classList.add('visible');
                }, 2000);

                setTimeout(() => {
                    description.classList.add('visible');
                }, 2500);

                if (buttons) {
                    setTimeout(() => {
                        buttons.classList.add('visible');
                    }, 3000);
                }
            }
        }

        // Initialize text animation
        initTextAnimation();
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    function toggleMenu() {
        // Toggle menu active state
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Hamburger click event
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevent clicks inside the menu from closing it
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current nav item based on URL
    const currentPage = window.location.pathname;
    navLinksItems.forEach(item => {
        const link = item.querySelector('a');
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.classList.add('active');
        }
    });

    // Scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(element => {
        observer.observe(element);
    });

    // Observe achievement list items
    document.querySelectorAll('.achievements-list li').forEach(element => {
        observer.observe(element);
    });

    // Add fade-in class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .certification-card, .education-card, .experience-card');
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Smooth hover effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    let isSubmitting = false; // Flag to prevent double submission

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Prevent double submission
            if (isSubmitting) {
                return;
            }
            
            isSubmitting = true;
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            
            const formData = new FormData(this);
            const alert = document.getElementById('formAlert');
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert.className = `alert alert-${data.status}`;
                alert.textContent = data.message;
                alert.style.display = 'block';
                
                if (data.status === 'success') {
                    this.reset();
                }
            })
            .catch(error => {
                alert.className = 'alert alert-error';
                alert.textContent = 'An error occurred. Please try again later.';
                alert.style.display = 'block';
            })
            .finally(() => {
                isSubmitting = false;
                submitButton.disabled = false;
            });
        });
    }
}); 
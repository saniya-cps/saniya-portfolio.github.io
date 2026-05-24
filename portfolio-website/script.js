document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU DRAWER & NAVIGATION
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    navItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });

    /* ==========================================================================
       THEME TOGGLE SYSTEM (DARK / LIGHT)
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference in localStorage, otherwise check system preference
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        body.className = currentTheme;
    } else {
        // Default to dark theme if no preference is saved
        body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    const handleScrollNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScrollNavbar);
    // Initial check in case of page reload halfway down
    handleScrollNavbar();

    /* ==========================================================================
       TYPEWRITER SIMULATION
       ========================================================================== */
    const typingElement = document.getElementById('typingElement');
    const phrases = [
        "code and physical reality.",
        "cyber-physical systems.",
        "intelligent algorithms.",
        "IoT sensor frameworks."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeWriter = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting state
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Backspace faster
        } else {
            // Typing state
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // Handle word completions or deletion cycles
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Word fully typed - pause before backspacing
            isDeleting = true;
            typingSpeed = 2000; // Large pause at the end
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted - move to the next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Small pause before typing next
        }

        setTimeout(typeWriter, typingSpeed);
    };

    if (typingElement) {
        typeWriter();
    }

    /* ==========================================================================
       INTERSECTION OBSERVER (SCROLL REVEALS)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element enters center stage
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       SKILL BARS TRIGGERS
       ========================================================================== */
    const skillSection = document.querySelector('.skills-section');
    const skillFills = document.querySelectorAll('.skill-fill');

    if (skillSection && skillFills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillFills.forEach(fill => {
                        // Get target width set in HTML style attribute
                        const targetWidth = fill.style.width;
                        fill.style.width = '0'; // reset first
                        setTimeout(() => {
                            fill.style.width = targetWidth; // Animate to true width
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        skillsObserver.observe(skillSection);
    }

    /* ==========================================================================
       BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTop');

    const handleBackToTopVisibility = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleBackToTopVisibility);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       CONTACT FORM FEEDBACK & LOCAL LOGS
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic verification
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all inputs.', 'error');
                return;
            }

            // Simulate form submission sending
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const originalText = submitBtnText.textContent;
            
            submitBtn.disabled = true;
            submitBtnText.textContent = "Sending...";
            
            // Simulate API request latency (e.g. Formspree or custom SMTP server)
            setTimeout(() => {
                // Success feedback
                showFormStatus(`Thank you, ${name}! Your message has been sent successfully. Saniya will respond shortly.`, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtnText.textContent = originalText;
                
                // Log to local console for audit purposes
                console.log("Form Submitted Successfully:", {
                    senderName: name,
                    senderEmail: email,
                    messageSubject: subject,
                    messageContent: message,
                    timestamp: new Date().toISOString()
                });
            }, 1500);
        });
    }

    const showFormStatus = (msg, type) => {
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // reset
        formStatus.classList.add(type);
        
        // Hide error statuses after 5 seconds, leave success messages visible
        if (type === 'error') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } else {
            formStatus.style.display = 'block';
        }
    };
});

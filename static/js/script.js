 document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-links a');
            const scrollTopBtn = document.querySelector('.scroll-top');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinksContainer = document.querySelector('.nav-links');
            const navbar = document.querySelector('.navbar');

            // Navigation scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Show/hide scroll to top button
                if (scrollTopBtn) {
                    if (window.scrollY > 300) {
                        scrollTopBtn.classList.add('visible');
                    } else {
                        scrollTopBtn.classList.remove('visible');
                    }
                }
            });

            // Mobile menu toggle
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navLinksContainer.classList.toggle('active');
                });
            }

            // Smooth scrolling for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    // Close mobile menu if open
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                    
                    // Scroll to section
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Scroll to top button
            if (scrollTopBtn) {
                scrollTopBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // Add animation to elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            const animatedElements = document.querySelectorAll('.skill-card, .education-card, .experience-card, .project-card, .achievement-card, .contact-card, .skill-category');
            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });

            // Highlight active navigation link
            const activeSection = function() {
                const sections = document.querySelectorAll('section');
                const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

                sections.forEach(section => {
                    const top = section.offsetTop - 100;
                    const bottom = top + section.offsetHeight;
                    const id = section.getAttribute('id');

                    if (scrollPos >= top && scrollPos < bottom) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            };

            window.addEventListener('scroll', activeSection);

            // Typing effect for hero title
            const typingText = document.querySelector('.typing-text');
            if (typingText) {
                const text = "Student | UI/UX & Web Developer";
                let index = 0;
                
                function typeWriter() {
                    if (index < text.length) {
                        typingText.innerHTML = text.substring(0, index + 1);
                        index++;
                        setTimeout(typeWriter, 100);
                    } else {
                        setTimeout(() => {
                            index = 0;
                            typeWriter();
                        }, 3000);
                    }
                }
                
                // Start typing effect after a short delay
                setTimeout(typeWriter, 1000);
            }
        });
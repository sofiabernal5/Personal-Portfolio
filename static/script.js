// Interactive Portfolio JavaScript
// Enhanced interactivity and animations

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll-triggered animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-animation, .section-title, .project-card, .timeline-item, .interest-card, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll, { passive: true });
    animateOnScroll(); // Run on page load

    // Enhanced project filtering with smooth transitions
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Animate out filtered projects
                projectItems.forEach((item, index) => {
                    item.style.transition = 'all 0.3s ease-out';
                    item.style.transform = 'translateY(20px)';
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.transform = 'translateY(0)';
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 150);
                });
            });
        });
    }

    // Parallax effect for hero background
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // Interactive hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing animation for hero text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-content h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 30);
        }, 1500);
    }

    // Interactive skill bars animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const items = this.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(10px)';
                    item.style.color = 'var(--forest-green)';
                }, index * 100);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const items = this.querySelectorAll('li');
            items.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.color = 'var(--dark-brown)';
            });
        });
    });

    // Smooth reveal animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }

    window.addEventListener('scroll', animateTimeline, { passive: true });
    setTimeout(animateTimeline, 500); // Initial check

    // Interactive contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.animation = '';
        });
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.btn, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .interest-card, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));

    // Add floating animation to hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        setInterval(() => {
            heroImage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                heroImage.style.transform = 'translateY(0)';
            }, 2000);
        }, 4000);
    }

    // Enhanced loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mouse follow effect for hero section
    const heroSection = document.getElementById('hero');
    if (heroSection && window.innerWidth > 768) {
        heroSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const heroContent = this.querySelector('.hero-content');
            const heroImage = this.querySelector('.hero-image');
            
            if (heroContent) {
                heroContent.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
            }
            
            if (heroImage) {
                heroImage.style.transform = `translate(${mouseX * -5}px, ${mouseY * -5}px)`;
            }
        });
        
        heroSection.addEventListener('mouseleave', function() {
            const heroContent = this.querySelector('.hero-content');
            const heroImage = this.querySelector('.hero-image');
            
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
            }
            
            if (heroImage) {
                heroImage.style.transform = 'translate(0, 0)';
            }
        });
    }

    // Add particle effect to background
    function createParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.1';
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#2E5233';
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Initialize particles on desktop only
    if (window.innerWidth > 768) {
        createParticles();
    }

    console.log('Portfolio interactions loaded successfully! ');
});
// Modern Scroll-Triggered Animations and Interactions

// ============================================
// 1. SCROLL-TRIGGERED FADE-IN ANIMATIONS
// ============================================
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll(`
        .section-tms-intro,
        .section-conditions,
        .section-process,
        .section-why-choose,
        .section-testimonials,
        .section-faq,
        .process-card,
        .why-card,
        .stat-card,
        .doctor-profile-wrapper,
        .credential-badge,
        .testimonial-card,
        .faq-item
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add animation trigger class
const style = document.createElement('style');
style.textContent = `
    .aos-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// 2. ENHANCED BUTTON RIPPLE EFFECT
// ============================================
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-submit, .condition-tab');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .btn-primary, .btn-submit, .condition-tab {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// 3. PARALLAX EFFECT FOR HERO SECTION
// ============================================
function addParallaxEffect() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        hero.style.transform = `translateY(${scroll * 0.5}px)`;
    });
}

// ============================================
// 4. COUNTER ANIMATION FOR STATS
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const text = target.innerText;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const num = parseInt(text.replace(/[^0-9]/g, ''));

                let count = 0;
                const increment = num / speed;

                const updateCount = () => {
                    count += increment;
                    if (count < num) {
                        let displayValue = Math.ceil(count);
                        if (hasPlus) displayValue += '+';
                        if (hasPercent) displayValue += '%';
                        target.innerText = displayValue;
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = text;
                        target.classList.add('counted');
                    }
                };
                updateCount();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// 5. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 6. FAQ ACCORDION FUNCTIONALITY
// ============================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// 7. MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');

    console.log('🍔 Mobile Menu Init:', {
        menuToggle: menuToggle,
        navMenu: navMenu,
        dropdowns: dropdownToggles.length
    });

    if (menuToggle && navMenu) {
        console.log('✅ Menu elements found! Adding click listener...');
        menuToggle.addEventListener('click', (e) => {
            console.log('🔥 HAMBURGER CLICKED!');
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('Menu active:', navMenu.classList.contains('active'));
        });
    } else {
        console.error('❌ Menu elements NOT found!', {
            toggle: !!menuToggle,
            menu: !!navMenu
        });
    }

    // Mobile dropdown functionality
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
}

// ============================================
// INITIALIZE ALL EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    addRippleEffect();
    // addParallaxEffect(); // Removed per user request
    animateCounters();
    addSmoothScroll();
    initFAQ();
    initMobileMenu();

    console.log('ðŸŽ¨ Modern animations and interactions loaded');
});



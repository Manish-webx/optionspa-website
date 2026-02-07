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
        .opt-section-tms-intro,
        .opt-section-conditions,
        .opt-section-process,
        .opt-section-why-choose,
        .opt-section-testimonials,
        .opt-section-faq,
        .opt-process-card,
        .opt-why-card,
        .stat-card,
        .opt-doctor-profile-wrapper,
        .opt-credential-badge,
        .opt-testimonial-card,
        .opt-faq-item
    `);

    animateElements.forEach((el, index) => {
        // If already has active class, don't hide it
        if (el.classList.contains('opt-active')) {
            el.classList.add('aos-animate');
            return;
        }
        // el.style.opacity = '0';
        // el.style.transform = 'translateY(30px)';
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
    const buttons = document.querySelectorAll('.opt-btn, .opt-btn-primary, .opt-btn-submit, .opt-condition-tab');

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
    .opt-btn, .opt-btn-primary, .opt-btn-submit, .opt-condition-tab {
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
    const hero = document.querySelector('.opt-hero-section');
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
    const counters = document.querySelectorAll('.opt-stat-number');
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
    // Use event delegation on the document to handle all FAQ clicks
    // This avoids issues with DOM readiness or dynamic elements
    if (document.body.hasAttribute('data-faq-delegated')) return; // Prevent double delegation

    document.body.addEventListener('click', function (e) {
        // Check if the clicked element or its parent is a faq-question
        const questionBtn = e.target.closest('.opt-faq-question');

        if (questionBtn) {
            e.preventDefault();

            const item = questionBtn.closest('.opt-faq-item');
            if (!item) return;

            const isActive = item.classList.contains('opt-active');
            const accordion = item.closest('.opt-faq-accordion');

            // If inside an accordion container, close siblings
            if (accordion) {
                const siblings = accordion.querySelectorAll('.opt-faq-item');
                siblings.forEach(el => {
                    if (el !== item) {
                        el.classList.remove('opt-active');
                    }
                });
            }

            // Toggle current item
            if (isActive) {
                item.classList.remove('opt-active');
            } else {
                item.classList.add('opt-active');
            }
        }
    });

    document.body.setAttribute('data-faq-delegated', 'true');
    console.log('✅ FAQ Event Delegation Initialized');
}

// ============================================
// 7. HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.opt-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('opt-scrolled');
        } else {
            header.classList.remove('opt-scrolled');
        }
    });
}

// ============================================
// 8. MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.opt-mobile-menu-toggle');
    const navMenu = document.querySelector('.opt-nav-menu');
    const dropdownToggles = document.querySelectorAll('.opt-dropdown > .opt-nav-link');

    console.log('🍔 Mobile Menu Init:', {
        menuToggle: menuToggle,
        navMenu: navMenu,
        dropdowns: dropdownToggles.length
    });

    if (menuToggle && navMenu) {
        // Check if inline script has already attached listeners
        // by checking if the elements already have a data attribute
        if (!menuToggle.hasAttribute('data-menu-initialized')) {
            console.log('✅ Adding menu event listeners from animations.js');
            menuToggle.addEventListener('click', (e) => {
                console.log('🔥 HAMBURGER CLICKED (from animations.js)!');
                navMenu.classList.toggle('opt-active');
                menuToggle.classList.toggle('opt-active');
                console.log('Menu active:', navMenu.classList.contains('opt-active'));
            });
            menuToggle.setAttribute('data-menu-initialized', 'true');
        } else {
            console.log('ℹ️ Menu already initialized by inline script, skipping animations.js listeners');
        }
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
                dropdown.classList.toggle('opt-active');
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
    // Mobile menu is now handled by inline scripts on each page
    initMobileMenu();
    initHeaderScroll();

    console.log('ðŸŽ¨ Modern animations and interactions loaded');
});



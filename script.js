// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll detection for nav background
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ========================================
// Scroll Reveal
// ========================================
function addRevealClasses() {
    const selectors = [
        '.highlight-card',
        '.skill-card',
        '.project-card',
        '.timeline-item',
        '.contact-method',
        '.contact-form',
        '.about-text',
        '.about-highlights',
        '.contact-info'
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.08}s`;
        });
    });
}

function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            el.classList.add('visible');
        }
    });
}

addRevealClasses();
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// ========================================
// Skill Bar Animation
// ========================================
function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && !fill.dataset.animated) {
            fill.style.width = fill.dataset.width + '%';
            fill.dataset.animated = 'true';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ========================================
// Counter Animation
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        if (counter.dataset.counted) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top > window.innerHeight) return;

        counter.dataset.counted = 'true';
        const target = parseInt(counter.dataset.target);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', () => {
    setTimeout(animateCounters, 1400);
});

// ========================================
// Active Nav Link
// ========================================
function updateActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const navAnchors = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
            current = section.id;
        }
    });

    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Message Sent!';
    btn.style.background = '#10b981';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
    }, 2500);
});

// ========================================
// Smooth Scroll (fallback)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

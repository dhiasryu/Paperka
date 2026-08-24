// 1. Custom Cursor Script
const cursor = document.querySelector('.custom-cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, input');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('expand'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
}

// 2. Mobile Menu Toggle
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// 3. Scroll Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// 4. Dark & Light Mode Switcher
const themeToggleBtn = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light';
        localStorage.setItem('paperka-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark';
        localStorage.setItem('paperka-theme', 'light');
    }
}

const savedTheme = localStorage.getItem('paperka-theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (themeIcon) {
            themeIcon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            themeIcon.style.transform = 'rotate(360deg) scale(1.4)';

            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg) scale(1)';
            }, 400);
        }

        applyTheme(isDark ? 'light' : 'dark');
    });
} // <- Penutup yang sebelumnya hilang

// 5. Back to Top Button Logic
const backToTopBtn = document.querySelector('#backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 6. Lightbox Modal Logic (Halaman Dokumentasi)
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('#lightbox');

if (lightbox && galleryItems.length > 0) {
    const lightboxImg = document.querySelector('#lightbox-img');
    const lightboxCaption = document.querySelector('#lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-overlay h3')?.innerText || '';
            const desc = item.querySelector('.gallery-overlay p')?.innerText || '';

            if (lightboxImg && img) lightboxImg.src = img.src;
            if (lightboxCaption) {
                lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="opacity:0.8; font-size:0.95rem;">${desc}</span>`;
            }
            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => lightbox.classList.remove('active');

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
            }

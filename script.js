// 1. Custom Cursor Script
const cursor = document.querySelector('.custom-cursor');
const hoverTargets = document.querySelectorAll('.hover-target, a, button, input');

document.addEventListener('mousemove', (e) => {
    // Memindahkan kursor custom sesuai posisi mouse
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efek membesar saat hover pada link/tombol
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// 2. Mobile Menu Toggle
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 3. Scroll Animation (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// 4. Dark & Light Mode Switcher (Dengan Animasi & Local Storage)
const themeToggleBtn = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');

// Fungsi untuk menerapkan tema
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

// Mengecek preferensi tema tersimpan
const savedTheme = localStorage.getItem('paperka-theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Menyesuaikan preferensi sistem bawaan pengguna jika belum ada pilihan tersimpan
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

// Event listener klik tombol switch dengan efek animasi interaktif
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        // Efek animasi putar 360 derajat & membesar pada ikon
        if (themeIcon) {
            themeIcon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            themeIcon.style.transform = 'rotate(360deg) scale(1.4)';

            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg) scale(1)';
            }, 400);
        }

        // Jalankan pergantian tema
        applyTheme(isDark ? 'light' : 'dark');
    });
}

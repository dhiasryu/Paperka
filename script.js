// Custom Cursor
const cursor = document.querySelector('.cursor');
const interactiveElements = document.querySelectorAll('a, button, .interactive-hover, .menu-toggle');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Menambahkan efek hover pada elemen interaktif
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-effect'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-effect'));
});

// Perbaikan Mobile Menu Navigasi
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

// Menutup menu saat link di klik (khusus mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

// Smooth Reveal Animation untuk elemen saat di scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

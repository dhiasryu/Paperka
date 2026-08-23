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

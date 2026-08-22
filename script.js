// 1. Logika untuk Mobile Menu (Hamburger Toggle)
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links');

// Membuka dan menutup menu ketika hamburger di klik
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Menutup menu otomatis ketika salah satu link diklik (khusus mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Logika untuk Animasi Scroll (Gen Z Smooth Reveal)
// Kita menggunakan IntersectionObserver agar elemen muncul saat masuk ke area layar
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Elemen akan muncul ketika 15% bagiannya terlihat di layar
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Berhenti memantau elemen setelah muncul (agar animasi tidak berulang-ulang)
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Mengambil semua elemen yang memiliki class 'hidden' di HTML
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

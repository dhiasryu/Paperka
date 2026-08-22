// Custom Cursor
const cursor = document.querySelector('.cursor');
const interactiveElements = document.querySelectorAll('a, button, .interactive-hover');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-effect'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-effect'));
});

// Smooth Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

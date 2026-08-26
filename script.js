document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. CUSTOM CURSOR
    // ==========================================================================
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

    // ==========================================================================
    // 2. MOBILE MENU TOGGLE (Lock Scroll, Drawer & Overlay Blur)
    // ==========================================================================
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');
    const menuOverlay = document.querySelector('#menuOverlay');

    function closeMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (menuToggle && navMenu) {
        // Toggle Buka / Tutup Menu saat ikon hamburger diklik
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Tutup menu jika area blur (overlay) diklik
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Tutup menu ketika salah satu link diklik
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Tutup menu jika tombol Escape ditekan
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ==========================================================================
    // 3. SCROLL ANIMATION (INTERSECTION OBSERVER)
    // ==========================================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // ==========================================================================
    // 4. DARK & LIGHT MODE SWITCHER
    // ==========================================================================
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
    }

    // ==========================================================================
    // 5. BACK TO TOP BUTTON LOGIC
    // ==========================================================================
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

    // ==========================================================================
    // 6. LIGHTBOX MODAL LOGIC (DOKUMENTASI)
    // ==========================================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('#lightbox');

    if (lightbox && galleryItems.length > 0) {
        const lightboxImg = document.querySelector('#lightbox-img');
        const lightboxCaption = document.querySelector('#lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');

        // 1. Definisikan fungsi penutup modal di atas
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-overlay h3')?.innerText || '';
                const desc = item.querySelector('.gallery-overlay p')?.innerText || '';

                if (lightboxImg && img) lightboxImg.src = img.src;
                if (lightboxCaption) {
                    lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="opacity:0.8; font-size:0.95rem;">${desc}</span>`;
                }

                // 2. Kunci scroll saat modal terbuka
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

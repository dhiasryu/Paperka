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
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
            
            const isMenuOpen = navMenu.classList.contains('active');
            if (isMenuOpen) {
                document.documentElement.classList.add('no-scroll');
                document.body.classList.add('no-scroll');
            } else {
                document.documentElement.classList.remove('no-scroll');
                document.body.classList.remove('no-scroll');
            }
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

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
    // 6. LOGIKA PAGINASI & LIGHTBOX MODAL DOKUMENTASI
    // ==========================================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const paginationContainer = document.getElementById('pagination');
    const itemsPerPage = 2;
    let currentPage = 1;

    function renderGallery() {
        if (galleryItems.length === 0) return;

        const totalPages = Math.ceil(galleryItems.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        // Sembunyikan semua foto
        galleryItems.forEach(item => item.style.display = 'none');

        // Tampilkan foto sesuai halaman aktif
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        galleryItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            }
        });

        renderPaginationControls(totalPages);
    }

    function renderPaginationControls(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        // Tombol Prev
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn hover-target';
        prevBtn.textContent = '← Prev';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
                scrollToGallery();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Tombol Angka Halaman
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn hover-target ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderGallery();
                scrollToGallery();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Tombol Next
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn hover-target';
        nextBtn.textContent = 'Next →';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
                scrollToGallery();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function scrollToGallery() {
        const target = document.querySelector('.gallery-section');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Jalankan paginasi saat pertama kali dimuat
    renderGallery();

    // Logika Lightbox Modal tetap berfungsi normal di bawah ini...
    const lightbox = document.querySelector('#lightbox');
    if (lightbox && galleryItems.length > 0) {
        const lightboxImg = document.querySelector('#lightbox-img');
        const lightboxCaption = document.querySelector('#lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');

        const openLightbox = () => {
            lightbox.classList.add('active');
            document.documentElement.classList.add('no-scroll');
            document.body.classList.add('no-scroll');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.documentElement.classList.remove('no-scroll');
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

                openLightbox();
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
}); // <-- PASTIKAN BARIS PENUTUP DOMContentLoaded INI TETAP ADA DI PALING AKHIR FILE

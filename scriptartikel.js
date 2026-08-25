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
    // 2. MOBILE MENU TOGGLE
    // ==========================================================================
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

    // ==========================================================================
    // 3. DARK & LIGHT MODE SWITCHER
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
    // 4. BACK TO TOP BUTTON LOGIC
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
    // 5. DATA ARTIKEL BARU
    // ==========================================================================
    const articlesData = [
        {
            id: 1,
            title: "none",
            category: "kegiatan",
            date: "25 Agustus 2026",
            readTime: "4 min baca",
            image: "asset/Icon.jpeg",
            excerpt: "None",
            content: `
                <p>None.</p>
            `
        },
        {
            id: 2,
            title: "None",
            category: "desa",
            date: "20 Agustus 2026",
            readTime: "3 min baca",
            image: "asset/Icon.jpeg",
            excerpt: "None.",
            content: `
                <p>None.</p>
            `
        },
        {
            id: 3,
            title: "None",
            category: "opini",
            date: "15 Agustus 2026",
            readTime: "5 min baca",
            image: "asset/Icon.jpeg",
            excerpt: "None.",
            content: `
                <p>None</p>
            `
        },
        {
            id: 4,
            title: "None",
            category: "kegiatan",
            date: "10 Agustus 2026",
            readTime: "3 min baca",
            image: "asset/Icon.jpeg",
            excerpt: "None.",
            content: `
                <p>None</p>
            `
        }
    ];

    // ==========================================================================
    // 6. LOGIKA PAGINASI & FILTER ARTIKEL
    // ==========================================================================
    const itemsPerPage = 2;
    let currentPage = 1;
    let currentCategory = 'all';
    let searchQuery = '';

    const articleCards = document.querySelectorAll('.article-card');
    const paginationContainer = document.getElementById('pagination');

    function getFilteredCards() {
        return Array.from(articleCards).filter(card => {
            const cardCategory = card.getAttribute('data-category');
            const titleText = (card.querySelector('h2, h3')?.textContent || '').toLowerCase();
            const excerptText = (card.querySelector('.excerpt')?.textContent || '').toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
            const matchesSearch = titleText.includes(searchQuery) || excerptText.includes(searchQuery);

            return matchesCategory && matchesSearch;
        });
    }

    function renderArticles() {
        const filteredCards = getFilteredCards();
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        articleCards.forEach(card => card.style.display = 'none');

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleCards = filteredCards.slice(startIndex, endIndex);

        visibleCards.forEach(card => {
            card.style.display = card.classList.contains('featured') ? 'grid' : 'flex';
        });

        renderPaginationControls(totalPages);
    }

    function renderPaginationControls(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn hover-target';
        prevBtn.textContent = '← Prev';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderArticles();
                scrollToArticles();
            }
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn hover-target ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderArticles();
                scrollToArticles();
            });
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn hover-target';
        nextBtn.textContent = 'Next →';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderArticles();
                scrollToArticles();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function scrollToArticles() {
        const target = document.querySelector('.article-container');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            currentPage = 1;
            renderArticles();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            currentPage = 1;
            renderArticles();
        });
    }

    renderArticles();

    // ==========================================================================
    // 7. MODAL READER (JENDELA BACA ARTIKEL)
    // ==========================================================================
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    function openArticle(id) {
        const article = articlesData.find(item => item.id === parseInt(id));
        if (!article || !modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>⏱️ ${article.readTime}</span>
            </div>
            <h1>${article.title}</h1>
            <img src="${article.image}" alt="${article.title}" class="modal-hero-img">
            <div class="article-full-text">
                ${article.content}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-btn')) {
            const articleId = e.target.getAttribute('data-id');
            openArticle(articleId);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 2. LOGIKA PAGINASI & FILTER ARTIKEL
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
        const articleContainer = document.querySelector('.article-grid') || document.querySelector('.article-container');

        filteredCards.sort((a, b) => {
            const idA = parseInt(a.getAttribute('data-id')) || 0;
            const idB = parseInt(b.getAttribute('data-id')) || 0;
            return idB - idA;
        });

        const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        // Sembunyikan kartu & hapus class animasi lama
        articleCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleCards = filteredCards.slice(startIndex, endIndex);

        visibleCards.forEach(card => {
            card.style.display = card.classList.contains('featured') ? 'grid' : 'flex';
            
            // Reflow browser untuk memicu animasi fade-in ulang
            void card.offsetWidth;
            card.classList.add('fade-in');

            if (articleContainer) {
                articleContainer.appendChild(card);
            }
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
                scrollToArticles();
                renderArticles();
            }
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn hover-target ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                scrollToArticles();
                renderArticles();
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
                scrollToArticles();
                renderArticles();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function scrollToArticles() {
    const target = document.querySelector('.article-hero');
    if (!target) return;

    // 1. Lepaskan fokus dari tombol paginasi yang baru diklik agar tidak memicu reset scroll browser
    if (document.activeElement) {
        document.activeElement.blur();
    }

    // 2. Hitung posisi tujuan (dikurangi tinggi navbar agar header tidak tertutup menu)
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // Durasi animasi dalam milidetik (0.5 detik)
    let startTime = null;

    // 3. Fungsi animasi matematika (Ease Out)
    function animationStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Rumus Easing (Membuat gerakan terasa mulus melambat di akhir)
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startPosition + (distance * ease));

        // Lanjutkan frame animasi jika belum selesai
        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }

    // 4. Jalankan animasi gulir
    requestAnimationFrame(animationStep);
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
    // 3. MODAL READER (JENDELA BACA ARTIKEL)
    // ==========================================================================
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    function renderRelatedArticles(currentArticle) {
        const related = articlesData
            .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
            .slice(0, 3);

        if (related.length === 0) return '';

        const cards = related.map(a => `
            <button class="related-card hover-target" data-id="${a.id}">
                <img src="${a.image}" alt="${a.title}" loading="lazy">
                <div class="related-card-body">
                    <span class="related-card-category">${a.category}</span>
                    <h4>${a.title}</h4>
                </div>
            </button>
        `).join('');

        return `
            <div class="related-articles">
                <h3 class="related-title">Artikel Terkait</h3>
                <div class="related-grid">${cards}</div>
            </div>
        `;
    }

    function showToast(message) {
        let toast = document.getElementById('paperka-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'paperka-toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function openArticle(id) {
        const article = articlesData.find(item => item.id === parseInt(id));
        if (!article || !modal || !modalContent) return;

        const shareUrl = `${window.location.origin}${window.location.pathname}#artikel-${article.id}`;

        modalContent.innerHTML = `
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>⏱️ ${article.readTime}</span>
            </div>
            <h1>${article.title}</h1>
            <img src="${article.image}" alt="${article.title}" class="modal-hero-img">

            <div class="share-bar">
                <span class="share-label">Bagikan:</span>
                <a class="social-btn share-wa hover-target" target="_blank" rel="noopener noreferrer"
                   href="https://wa.me/?text=${encodeURIComponent('Ayo Baca' + article.title + ' di ' + shareUrl)}">
                    <span class="social-icon">
                         <img src="/asset/wa.png" alt="whatsapp">
                    </span>
                </a>
                <button class="share-btn share-copy hover-target" data-share-url="${shareUrl}">
                    🔗 Salin Link
                </button>
            </div>

            <div class="article-full-text">
                ${article.content}
            </div>

            ${renderRelatedArticles(article)}
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        history.replaceState(null, '', `#artikel-${article.id}`);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        history.replaceState(null, '', window.location.pathname);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
    });

    document.addEventListener('click', (e) => {
        const readBtn = e.target.closest('.read-btn');
        if (readBtn) {
            openArticle(readBtn.getAttribute('data-id'));
            return;
        }

        const relatedCard = e.target.closest('.related-card');
        if (relatedCard) {
            openArticle(relatedCard.getAttribute('data-id'));
            return;
        }

        const copyBtn = e.target.closest('.share-copy');
        if (copyBtn) {
            const url = copyBtn.getAttribute('data-share-url');
            navigator.clipboard.writeText(url)
                .then(() => showToast('Link disalin!'))
                .catch(() => showToast('Gagal menyalin link'));
        }
    });

    // Buka artikel otomatis kalau ada hash link (misal dari link yang di-share)
    const hashMatch = window.location.hash.match(/^#artikel-(\d+)$/);
    if (hashMatch) {
        openArticle(hashMatch[1]);
    }
});

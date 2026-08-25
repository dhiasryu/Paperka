document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DATA ARTIKEL LENGKAP
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
    // 2. MODAL READER (JENDELA BACA)
    // ==========================================================================
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    // Fungsi Buka Artikel
    function openArticle(id) {
        const article = articlesData.find(item => item.id === parseInt(id));
        if (!article) return;

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
        document.body.style.overflow = 'hidden'; // Matikan scroll background
    }

    // Fungsi Tutup Artikel
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Hidupkan scroll background
    }

    // Event Listener Tutup Modal
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Tutup dengan tombol Escape di Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Delegasi Event Klik Tombol Baca
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-btn')) {
            const articleId = e.target.getAttribute('data-id');
            openArticle(articleId);
        }
    });

    // ==========================================================================
    // 3. FITUR FILTER KATEGORI & PENCARIAN
    // ==========================================================================
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterArticles() {
        articleCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const titleText = card.querySelector('h2, h3').textContent.toLowerCase();
            const excerptText = card.querySelector('.excerpt').textContent.toLowerCase();

            const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
            const matchesSearch = titleText.includes(searchQuery) || excerptText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = card.classList.contains('featured') ? 'grid' : 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event Filter Kategori
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            filterArticles();
        });
    });

    // Event Pencarian Real-time
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterArticles();
        });
    }
});

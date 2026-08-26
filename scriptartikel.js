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
            title: "Peran Paperka dalam Membangun Masyarakat di Padukuhan Kandangan",
            category: "Gagasan",
            date: "26 Agustus 2026",
            readTime: "10 min baca",
            image: "asset/Icon.jpeg",
            excerpt: "Paperka (Karang Taruna) merupakan pilar penting dalam menggerakkan roda pembangunan sosial, ekonomi, dan budaya di Padukuhan Kandangan...",
            content: `
                <p>Paperka (Karang Taruna) merupakan organisasi kepemudaan yang tumbuh dari, oleh, dan untuk masyarakat, khususnya generasi muda di tingkat desa maupun padukuhan. Di Padukuhan Kandangan, keberadaan Paperka menjadi salah satu pilar penting dalam menggerakkan roda pembangunan sosial, ekonomi, dan budaya di tingkat akar rumput. Organisasi ini tidak sekadar menjadi wadah berkumpulnya para pemuda, tetapi juga menjelma menjadi motor penggerak berbagai program yang menyentuh langsung kebutuhan masyarakat.</p>

                <h3>Paperka sebagai Wadah Pemberdayaan Pemuda</h3>
                <p>Salah satu peran utama Paperka di Padukuhan Kandangan adalah sebagai wadah pemberdayaan generasi muda. Melalui berbagai kegiatan seperti pelatihan keterampilan, diskusi kepemudaan, dan program kewirausahaan, para pemuda diajak untuk mengembangkan potensi diri sekaligus berkontribusi bagi lingkungan sekitar. Hal ini penting mengingat pemuda merupakan aset masa depan yang akan meneruskan estafet kepemimpinan dan pembangunan di padukuhan.</p>
                <p>Dengan adanya wadah ini, energi dan kreativitas pemuda dapat diarahkan pada kegiatan yang produktif, sehingga mengurangi potensi keterlibatan dalam perilaku negatif seperti tawuran, penyalahgunaan waktu luang, atau pengangguran tanpa arah.</p>

                <h3>Motor Penggerak Kegiatan Sosial dan Gotong Royong</h3>
                <p>Paperka juga berperan aktif dalam menghidupkan kembali semangat gotong royong yang menjadi ciri khas masyarakat pedesaan. Kegiatan seperti kerja bakti membersihkan lingkungan, perbaikan fasilitas umum, hingga bantuan bagi warga yang membutuhkan menjadi agenda rutin yang digerakkan oleh para anggota Paperka.</p>
                <p>Selain itu, dalam momen-momen tertentu seperti peringatan hari besar nasional maupun keagamaan, Paperka kerap menjadi panitia pelaksana yang mengorganisir warga untuk terlibat bersama, mempererat tali silaturahmi antarwarga, dan menjaga kekompakan masyarakat.</p>

                <h3>Keaktifan Anggota sebagai Kunci Keberhasilan Organisasi</h3>
                <p>Tidak dapat dipungkiri, keberhasilan Paperka di Padukuhan Kandangan dalam menjalankan berbagai programnya sangat bergantung pada keaktifan para anggotanya. Semangat kebersamaan yang ditunjukkan melalui kehadiran rutin dalam rapat, kesediaan mengambil peran dalam setiap kegiatan, hingga inisiatif untuk terus belajar dan berkembang menjadi fondasi yang menentukan hidup atau matinya sebuah organisasi kepemudaan di tingkat padukuhan.</p>
                <p>Anggota yang aktif tidak hanya hadir secara fisik, tetapi juga turut memikirkan arah organisasi, memberikan gagasan segar, dan menjaga agar Paperka tetap relevan dengan kebutuhan zaman.</p>
                
                <blockquote>“Idealisme adalah kemewahan terakhir yang hanya dimiliki oleh seorang pemuda.” — Tan Malaka</blockquote>
                
                <p>Kutipan ini menjadi pengingat penting bagi setiap anggota agar tidak mudah kehilangan semangat dan idealismenya di tengah kesibukan pribadi, sebab justru pada usia mudalah seseorang memiliki keleluasaan untuk berjuang dan berkontribusi tanpa banyak beban.</p>
                <p>Sayangnya, tantangan yang kerap dihadapi organisasi kepemudaan seperti Paperka adalah menurunnya partisipasi anggota seiring berjalannya waktu, entah karena kesibukan pekerjaan, pendidikan, maupun hilangnya rasa memiliki terhadap organisasi. Padahal, sekecil apa pun peran yang diambil, keterlibatan setiap anggota adalah nyawa dari keberlangsungan organisasi itu sendiri. Oleh karena itu, penting bagi seluruh anggota Paperka untuk terus menjaga komitmen dan tidak melupakan organisasi yang telah menjadi tempatnya bertumbuh, sebab dari keaktifan itulah lahir program-program nyata yang dirasakan manfaatnya oleh masyarakat luas.</p>

                <h3>Menjaga Keamanan dan Ketertiban Lingkungan</h3>
                <p>Peran lain yang tidak kalah penting adalah kontribusi Paperka dalam menjaga keamanan dan ketertiban lingkungan. Melalui kegiatan ronda malam, maupun keterlibatan dalam penanganan situasi darurat seperti bencana alam, para anggota Paperka menjadi garda terdepan yang siap sedia membantu masyarakat kapan pun dibutuhkan.</p>

                <h3>Penutup</h3>
                <p>Keberadaan Paperka di Padukuhan Kandangan membuktikan bahwa organisasi kepemudaan mampu menjadi jembatan antara potensi generasi muda dengan kebutuhan pembangunan masyarakat secara menyeluruh. Melalui berbagai program di bidang sosial, ekonomi, keamanan, dan pemberdayaan pemuda, Paperka telah menunjukkan kontribusi nyata dalam membangun padukuhan yang lebih maju, guyub, dan sejahtera.</p>
                <p>Dukungan dari seluruh elemen masyarakat, mulai dari perangkat padukuhan hingga warga secara umum, tentu sangat diperlukan agar peran strategis Paperka ini dapat terus berkembang dan memberikan manfaat yang berkelanjutan bagi Padukuhan Kandangan.</p>

                <br>
                <p><em><strong>Artikel ini ditulis oleh: Raka</strong></em></p>
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

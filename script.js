/**
 * @file Script principal de interatividade do site da Infinity School.
 * @description Gerencia tema, navegação, modais, animações e conteúdo dinâmico.
 * @version 9.0
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores globais ---
    const { body } = document;
    const allModals = document.querySelectorAll('.modal');
    const sections = document.querySelectorAll('section');

    // --- Tema ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeFooterText = document.getElementById('theme-footer-text');
    const originalTitle = document.title;
    const bahiaThemeTitle = 'A Infinity também é o mundo!!!';

    // --- Navegação ---
    const header = document.querySelector('.main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    // --- Modais ---
    const loginModal = document.getElementById('login-modal');
    const hoursModal = document.getElementById('hours-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const loginLink = document.getElementById('login-link');
    const hoursBtn = document.getElementById('hours-btn');
    const contactBtns = document.querySelectorAll('.open-contact-modal');
    const contactForm = document.getElementById('contact-form');

    // --- Mural de novidades ---
    const avisosContainer = document.getElementById('avisos-container');
    const professoresContainer = document.getElementById('professores-container');
    const novosCursosContainer = document.getElementById('novos-cursos-container');

    /**
     * Carrega e renderiza o mural de novidades a partir do arquivo db.json.
     * Usa <li> dentro das listas <ul> para melhor semântica e acessibilidade.
     */
    async function loadUpdatesData() {
        // Só executa se os três containers existirem (apenas na página inicial).
        if (!avisosContainer || !professoresContainer || !novosCursosContainer) return;

        try {
            const response = await fetch('db.json');
            if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
            const data = await response.json();

            // Limpa os containers antes de preencher.
            avisosContainer.innerHTML = '';
            professoresContainer.innerHTML = '';
            novosCursosContainer.innerHTML = '';

            // Avisos
            data.avisos.forEach(aviso => {
                const li = document.createElement('li');
                li.className = 'aviso-card';
                li.innerHTML = `
                    <div class="aviso-card-header">
                        <h4>${aviso.titulo}</h4>
                        <span>${aviso.data}</span>
                    </div>
                    <p>${aviso.mensagem}</p>
                `;
                avisosContainer.appendChild(li);
            });

            // Professores
            data.professores.forEach(prof => {
                const li = document.createElement('li');
                li.className = 'professor-item';
                li.innerHTML = `
                    <strong>${prof.nome}</strong>
                    <span>${prof.especialidade}</span>
                `;
                professoresContainer.appendChild(li);
            });

            // Novos cursos
            data.novos_cursos.forEach(curso => {
                const li = document.createElement('li');
                li.className = 'curso-item';
                const statusClass = curso.status === 'Inscrições Abertas' ? 'status-aberto' : 'status-breve';
                li.innerHTML = `
                    <strong>${curso.nome}</strong>
                    <span class="${statusClass}">${curso.status}</span>
                `;
                novosCursosContainer.appendChild(li);
            });

        } catch (error) {
            console.error('Não foi possível carregar as novidades:', error);
            const updatesSection = document.getElementById('updates');
            if (updatesSection) {
                updatesSection.innerHTML = '<p style="text-align:center;color:#ff8a8a;">Não foi possível carregar as novidades no momento. Tente novamente mais tarde.</p>';
            }
        }
    }

    /**
     * Anima a entrada dos elementos do Hero (palavras do título, parágrafo e botão).
     */
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (!heroTitle) return;

        const heroParagraph = document.querySelector('.hero-content p');
        const heroButton = document.querySelector('.hero-content .cta-button-hero');
        const wordSpans = heroTitle.querySelectorAll('.word-wrapper');
        if (wordSpans.length === 0) return;

        const titleAnimationDuration = 300 * wordSpans.length;
        wordSpans.forEach((span, index) => {
            setTimeout(() => span.classList.add('is-visible'), 300 * index);
        });

        setTimeout(() => {
            if (heroParagraph) heroParagraph.classList.add('is-visible');
            if (heroButton) heroButton.classList.add('is-visible');
        }, titleAnimationDuration);
    }

    /**
     * Controla a reprodução e a transição (fade-out) do vídeo do Hero.
     */
    function handleHeroVideo() {
        const heroVideo = document.getElementById('hero-video');
        if (!heroVideo) return;

        heroVideo.addEventListener('canplaythrough', () => {
            heroVideo.play().catch(e => console.error('Erro ao reproduzir o vídeo:', e));

            setTimeout(() => {
                heroVideo.classList.add('video-fade-out');
                setTimeout(() => {
                    heroVideo.pause();
                    heroVideo.style.display = 'none';
                }, 1000);
            }, 6000); // 6 segundos de vídeo antes da transição
        });

        heroVideo.addEventListener('error', () => {
            console.warn('Não foi possível carregar o vídeo. Exibindo imagem estática.');
            heroVideo.style.display = 'none';
        });
    }

    /**
     * Alterna o tema (vermelho/azul) e atualiza título e mensagem do rodapé.
     */
    function setupTheme() {
        if (!themeToggle) return;

        const setFooterMessage = () => {
            if (!themeFooterText) return;
            const blue = '#0055A4', red = '#EC1C24', white = '#FFFFFF';
            themeFooterText.innerHTML =
                `<span style="color:${blue};">A</span><span style="color:${white};"> Infinity</span>` +
                `<span style="color:${red};"> também</span><span style="color:${blue};"> é</span>` +
                `<span style="color:${white};"> o</span><span style="color:${red};"> mundo!!!</span>`;
        };
        const clearFooterMessage = () => { if (themeFooterText) themeFooterText.innerHTML = ''; };

        const updateThemeAssets = () => {
            if (body.classList.contains('theme-blue')) {
                document.title = bahiaThemeTitle;
                setFooterMessage();
            } else {
                document.title = originalTitle;
                clearFooterMessage();
            }
        };

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('theme-blue');
            localStorage.setItem('theme', body.classList.contains('theme-blue') ? 'blue' : 'default');
            updateThemeAssets();
        });

        // Aplica o tema salvo ao carregar a página.
        if (localStorage.getItem('theme') === 'blue') body.classList.add('theme-blue');
        updateThemeAssets();
    }

    /**
     * Menu hambúrguer (mobile): abre/fecha e anima o ícone para "X".
     */
    function setupHamburgerMenu() {
        if (!hamburger || !navLinks) return;

        const toggleMenu = (open) => {
            navLinks.classList.toggle('active', open);
            hamburger.classList.toggle('is-open', open);
            hamburger.setAttribute('aria-expanded', String(open));
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(!navLinks.classList.contains('active'));
        });

        // Fecha ao clicar em um link do menu.
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Fecha ao clicar fora do menu.
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    /**
     * Gerencia abertura e fechamento de todos os modais.
     */
    function setupModals() {
        const openModal = (modal) => { if (modal) modal.classList.add('is-open'); };
        const closeModal = (modal) => { if (modal) modal.classList.remove('is-open'); };

        if (loginLink) loginLink.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); });
        if (hoursBtn) hoursBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(hoursModal); });

        contactBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(contactModal); }));
        closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));

        // Clique no fundo escuro fecha o modal.
        allModals.forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); }));

        // Tecla ESC fecha qualquer modal aberto.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') allModals.forEach(closeModal);
        });

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = new FormData(contactForm).get('name');
                alert(`Obrigado pelo seu contato, ${name}! Recebemos sua mensagem e retornaremos em breve.`);
                closeModal(contactModal);
                contactForm.reset();
            });
        }
    }

    /**
     * Revela as seções com uma animação quando entram na tela (IntersectionObserver).
     */
    function setupScrollAnimations() {
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    }

    /**
     * Adiciona uma classe ao header quando a página é rolada (fundo mais opaco).
     */
    function setupHeaderScroll() {
        if (!header) return;
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /**
     * Preenche o ano atual no rodapé automaticamente.
     */
    function setupCurrentYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Inicialização: chama todas as funções acima.
     */
    function init() {
        loadUpdatesData();
        animateHeroElements();
        handleHeroVideo();
        setupTheme();
        setupHamburgerMenu();
        setupModals();
        setupScrollAnimations();
        setupHeaderScroll();
        setupCurrentYear();
    }

    init();
});

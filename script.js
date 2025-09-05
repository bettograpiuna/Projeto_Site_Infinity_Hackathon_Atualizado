/**
 * @file Script principal para interatividade do site da Infinity School.
 * @description Gerencia o menu de navegação, modais, tema, animações e carregamento de conteúdo dinâmico.
 * @version 8.0
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores de Elementos Globais ---
    const { body } = document;
    const allModals = document.querySelectorAll('.modal');
    const sections = document.querySelectorAll('section');

    // --- Lógica do Tema ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeFooterText = document.getElementById('theme-footer-text');
    const originalTitle = document.title;
    const bahiaThemeTitle = "A Infinity também é o mundo!!!";

    // --- Lógica de Navegação e Menu ---
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    // --- Lógica dos Modais ---
    const loginModal = document.getElementById('login-modal');
    const hoursModal = document.getElementById('hours-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const loginLink = document.getElementById('login-link');
    const hoursBtn = document.getElementById('hours-btn');
    const contactBtns = document.querySelectorAll('.open-contact-modal');
    const contactForm = document.getElementById('contact-form');
    
    // --- Lógica do Mural de Novidades ---
    const avisosContainer = document.getElementById('avisos-container');
    const professoresContainer = document.getElementById('professores-container');
    const novosCursosContainer = document.getElementById('novos-cursos-container');

    /**
     * Carrega e renderiza os dados do mural de novidades (avisos, professores, novos cursos) do arquivo db.json.
     * Utiliza tags semânticas (<li>) para melhor SEO e acessibilidade.
     */
    async function loadUpdatesData() {
        // Garante que a função só execute se os containers existirem na página.
        if (!avisosContainer || !professoresContainer || !novosCursosContainer) return;

        try {
            const response = await fetch('db.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Limpa containers antes de adicionar novos elementos
            avisosContainer.innerHTML = '';
            professoresContainer.innerHTML = '';
            novosCursosContainer.innerHTML = '';

            // Popula os avisos
            data.avisos.forEach(aviso => {
                const listItem = document.createElement('li');
                listItem.className = 'aviso-card';
                listItem.innerHTML = `
                    <div class="aviso-card-header">
                        <h4>${aviso.titulo}</h4>
                        <span>${aviso.data}</span>
                    </div>
                    <p>${aviso.mensagem}</p>
                `;
                avisosContainer.appendChild(listItem);
            });

            // Popula os professores
            data.professores.forEach(prof => {
                const listItem = document.createElement('li');
                listItem.className = 'professor-item';
                listItem.innerHTML = `
                    <strong>${prof.nome}</strong>
                    <span>${prof.especialidade}</span>
                `;
                professoresContainer.appendChild(listItem);
            });

            // Popula os novos cursos
            data.novos_cursos.forEach(curso => {
                const listItem = document.createElement('li');
                listItem.className = 'curso-item';
                const statusClass = curso.status === "Inscrições Abertas" ? 'status-aberto' : 'status-breve';
                listItem.innerHTML = `
                    <strong>${curso.nome}</strong>
                    <span class="${statusClass}">${curso.status}</span>
                `;
                novosCursosContainer.appendChild(listItem);
            });

        } catch (error) {
            console.error("Não foi possível carregar os dados de novidades:", error);
            const updatesSection = document.getElementById('updates');
            if(updatesSection) updatesSection.innerHTML = '<p style="text-align: center; color: #ff8a8a;">Não foi possível carregar as novidades no momento. Tente novamente mais tarde.</p>';
        }
    }

    /**
     * Anima os elementos da seção Hero (título, parágrafo, botão) com um efeito de entrada.
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
     * Controla a reprodução e a transição do vídeo na seção Hero.
     */
    function handleHeroVideo() {
        const heroVideo = document.getElementById('hero-video');
        if (!heroVideo) return;
        
        heroVideo.addEventListener('canplaythrough', () => {
            heroVideo.play().catch(e => console.error("Erro ao reproduzir o vídeo:", e));
            
            setTimeout(() => {
                heroVideo.classList.add('video-fade-out');
                setTimeout(() => {
                    heroVideo.pause();
                    heroVideo.style.display = 'none';
                }, 1000);
            }, 6000); // 6 segundos de vídeo antes da transição
        });

        heroVideo.addEventListener('error', () => {
            console.warn("Não foi possível carregar o vídeo. Exibindo imagem de fundo estática.");
            heroVideo.style.display = 'none'; 
        });
    }

    /**
     * Alterna a classe do tema no body e atualiza os recursos visuais relacionados.
     */
    function toggleTheme() {
        if (!themeToggle) return;

        const setFooterMessage = () => {
            if (themeFooterText) {
                const blue = '#0055A4', red = '#EC1C24', white = '#FFFFFF';
                themeFooterText.innerHTML = `<span style="color: ${blue};">A</span><span style="color: ${white};"> Infinity</span><span style="color: ${red};"> também</span><span style="color: ${blue};"> é</span><span style="color: ${white};"> o</span><span style="color: ${red};"> mundo!!!</span>`;
            }
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
        
        // Aplica o tema salvo ao carregar a página
        if (localStorage.getItem('theme') === 'blue') {
            body.classList.add('theme-blue');
        }
        updateThemeAssets();
    }
    
    /**
     * Configura os event listeners para o menu hambúrguer (mobile).
     */
    function setupHamburgerMenu() {
        if (!hamburger || !navLinks) return;
        
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    /**
     * Gerencia a abertura e fechamento de todos os modais da página.
     */
    function setupModals() {
        const openModal = (modal) => { if (modal) modal.style.display = 'flex'; };
        const closeModal = (modal) => { if (modal) modal.style.display = 'none'; };

        if (loginLink) loginLink.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); });
        if (hoursBtn) hoursBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(hoursModal); });
        
        contactBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(contactModal); }));
        closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));
        
        allModals.forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); }));

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                alert(`Obrigado pelo seu contato, ${name}! Recebemos sua mensagem e retornaremos em breve.`);
                closeModal(contactModal);
                contactForm.reset();
            });
        }
    }

    /**
     * Utiliza IntersectionObserver para animar seções quando elas entram na viewport.
     */
    function setupScrollAnimations() {
        if (sections.length === 0) return;

        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    /**
     * Função principal de inicialização que chama todas as outras funções.
     */
    function init() {
        loadUpdatesData();
        animateHeroElements();
        handleHeroVideo();
        toggleTheme();
        setupHamburgerMenu();
        setupModals();
        setupScrollAnimations();
    }

    init();
});
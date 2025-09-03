document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores de Elementos ---
    const { body } = document;
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeFooterText = document.getElementById('theme-footer-text');
    const originalTitle = "Infinity School - A Revolução Criativa";
    const bahiaThemeTitle = "A Infinity também é o mundo!";
    const courseCards = document.querySelectorAll('.course-card');
    
    // Seletores de Modais
    const loginModal = document.getElementById('login-modal');
    const hoursModal = document.getElementById('hours-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Seletores de Botões Gatilho
    const loginLink = document.getElementById('login-link');
    const hoursBtn = document.getElementById('hours-btn');
    const contactBtns = document.querySelectorAll('.open-contact-modal');
    
    const sections = document.querySelectorAll('section');

    // --- DADOS DOS CURSOS (para preencher descrições no hover) ---
    const coursesData = {
        fullstack: { description: "Aprenda a criar aplicações web do zero ao deploy, dominando tanto o Front-End quanto o Back-End." },
        marketing: { description: "Transforme marcas e domine as plataformas digitais com estratégias de redes sociais, branding e campanhas de alto impacto." },
        design: { description: "Explore sua criatividade aplicada para criar identidades visuais impactantes, interfaces de usuário (UI/UX) e peças gráficas." },
        photography: { description: "Domine a arte da luz e da linguagem visual, com técnicas de estúdio, direção, edição e a construção de um olhar autoral." },
        filmdesign: { description: "Do roteiro à tela, crie narrativas visuais que prendem a atenção, abordando produção, direção de arte e edição." }
    };

    // --- FUNÇÃO PARA PREENCHER DESCRIÇÕES DOS CURSOS ---
    function populateCourseDescriptions() {
        courseCards.forEach(card => {
            const courseId = card.dataset.course;
            const descriptionElement = card.querySelector('.course-description');
            if (coursesData[courseId] && descriptionElement) {
                descriptionElement.textContent = coursesData[courseId].description;
            }
        });
    }

    // --- FUNÇÃO PARA CARREGAR NOTÍCIAS DO JSON ---
    async function loadNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) { return; }

        try {
            const response = await fetch('db.json');
            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            const data = await response.json();
            
            let newsHTML = '';
            data.noticias.forEach(noticia => {
                newsHTML += `
                    <div class="news-card">
                        <img src="${noticia.imagem}" alt="${noticia.titulo}">
                        <div class="news-card-content">
                            <h3>${noticia.titulo}</h3>
                            <span class="date">${noticia.data}</span>
                            <p>${noticia.resumo}</p>
                        </div>
                    </div>
                `;
            });
            newsContainer.innerHTML = newsHTML;
        } catch (error) {
            console.error("Erro ao carregar as notícias:", error);
            newsContainer.innerHTML = "<p>Não foi possível carregar as notícias no momento.</p>";
        }
    }

    // --- LÓGICA PARA O MENU HAMBÚRGUER (MOBILE) ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- LÓGICA PARA O TEMA, TÍTULO E RODAPÉ ---
    const setFooterMessage = () => {
        const blue = '#0055A4'; const red = '#EC1C24'; const white = '#FFFFFF';
        if (themeFooterText) {
            themeFooterText.innerHTML = `<span style="color: ${blue};">A</span><span style="color: ${white};"> Infinity</span><span style="color: ${red};"> também</span><span style="color: ${blue};"> é</span><span style="color: ${white};"> o</span><span style="color: ${red};"> mundo!!!</span>`;
        }
    };
    const clearFooterMessage = () => {
        if (themeFooterText) { themeFooterText.innerHTML = ''; }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('theme-blue');
            if (body.classList.contains('theme-blue')) {
                document.title = bahiaThemeTitle;
                setFooterMessage();
            } else {
                document.title = originalTitle;
                clearFooterMessage();
            }
        });
    }
    if (body.classList.contains('theme-blue')) {
        document.title = bahiaThemeTitle;
        setFooterMessage();
    } else {
        document.title = originalTitle;
        clearFooterMessage();
    }

    // --- LÓGICA PARA A ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER) ---
    if (sections.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('is-visible'); }
            });
        }, observerOptions);
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- LÓGICA PARA OS MODAIS ---
    if (loginLink && loginModal) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    if (hoursBtn && hoursModal) {
        hoursBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hoursModal.style.display = 'flex';
        });
    }

    if (contactBtns.length > 0 && contactModal) {
        contactBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                contactModal.style.display = 'flex';
            });
        });
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // --- LÓGICA PARA O EFEITO 3D TILT NOS CARDS ---
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length > 0) {
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // --- INICIALIZAÇÃO DAS FUNÇÕES PRINCIPAIS ---
    populateCourseDescriptions();
    loadNews();
});
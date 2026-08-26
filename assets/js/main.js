document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const dictionary = {
        pt: {
            nav: ['Sobre Mim', 'Projetos', 'Experiências', 'Contato'],
            title: 'Olá, eu sou <span class="highlight">Luiz Maia</span>',
            subtitle: 'Desenvolvedor de Software',
            bio: 'Estudante de Engenharia de Software na PUC Minas. Transformo processos, regras de negócio e necessidades reais em sistemas claros, funcionais e preparados para evoluir.',
            buttons: ['Fale Comigo', 'Ver Projetos'], sections: ['Projetos', 'Experiências', 'Links e contato'],
            contactTitle: 'Vamos construir algo que funcione?',
            contactText: 'Estou aberto a novos projetos e conversas sobre desenvolvimento de software.'
        },
        en: {
            nav: ['About Me', 'Projects', 'Experience', 'Contact'],
            title: 'Hello, I am <span class="highlight">Luiz Maia</span>',
            subtitle: 'Software Developer',
            bio: 'Software Engineering student at PUC Minas. I turn processes, business rules, and real needs into clear, functional systems built to evolve.',
            buttons: ['Get in Touch', 'View Projects'], sections: ['Projects', 'Experience', 'Links and contact'],
            contactTitle: 'Shall we build something that works?',
            contactText: 'I am open to new projects and conversations about software development.'
        }
    };

    const btnPt = document.getElementById('lang-pt');
    const btnEn = document.getElementById('lang-en');
    const navLinks = [...document.querySelectorAll('.nav-menu a')];

    function changeLanguage(lang) {
        const t = dictionary[lang];
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        btnPt.classList.toggle('active', lang === 'pt');
        btnEn.classList.toggle('active', lang === 'en');
        navLinks.forEach((link, index) => { link.textContent = t.nav[index]; });
        document.querySelector('.hero-text h1').innerHTML = t.title;
        document.querySelector('.hero-text h2').textContent = t.subtitle;
        document.getElementById('bio-text').textContent = t.bio;
        document.querySelectorAll('.hero-buttons .btn').forEach((button, index) => { button.textContent = t.buttons[index]; });
        document.querySelectorAll('.section-title').forEach((title, index) => { title.textContent = t.sections[index]; });
        document.querySelector('.contact-info h3').textContent = t.contactTitle;
        document.querySelector('.contact-info p').textContent = t.contactText;
    }

    btnPt.addEventListener('click', () => changeLanguage('pt'));
    btnEn.addEventListener('click', () => changeLanguage('en'));

    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        sections.forEach(section => {
            const active = window.scrollY >= section.offsetTop - 140 && window.scrollY < section.offsetTop + section.offsetHeight - 140;
            if (active) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${section.id}`));
        });
    }
    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
    highlightNavOnScroll();

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.timeline-item, .card, .contact-info, .resource-link').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity .6s ease-out, transform .6s ease-out';
            observer.observe(element);
        });
        const style = document.createElement('style');
        style.textContent = '.is-visible{opacity:1!important;transform:translateY(0)!important}';
        document.head.appendChild(style);
    }
});

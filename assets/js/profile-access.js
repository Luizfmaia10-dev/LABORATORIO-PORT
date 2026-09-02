/** Personalização persistente de perfil. Não controla conteúdo sensível. */
document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'luiz-maia.portfolio.profile.v1';
    const profiles = {
        recruiter: {
            label: { pt: 'Recrutador', en: 'Recruiter' },
            context: { pt: 'Visão profissional · experiência e impacto em primeiro plano', en: 'Professional view · experience and impact first' },
            experiences: ['ndm', 'education', 'monitor', 'courses'], projects: ['ndm', 'bank', 'aeds']
        },
        teacher: {
            label: { pt: 'Professor', en: 'Teacher' },
            context: { pt: 'Visão acadêmica · formação e fundamentos em destaque', en: 'Academic view · education and fundamentals highlighted' },
            experiences: ['education', 'monitor', 'courses', 'ndm'], projects: ['aeds', 'bank', 'ndm']
        },
        visitor: {
            label: { pt: 'Visitante', en: 'Visitor' },
            context: { pt: 'Visão geral · trajetória, projetos e contatos', en: 'Overview · journey, projects and contact' },
            experiences: ['ndm', 'monitor', 'education', 'courses'], projects: ['ndm', 'bank', 'aeds']
        }
    };

    const dialog = document.getElementById('profileDialog');
    const changeButton = document.getElementById('changeProfile');
    const closeButton = document.getElementById('closeProfileDialog');
    const label = document.getElementById('currentProfileLabel');
    const context = document.getElementById('profileContext');
    const experienceGrid = document.querySelector('#experiencias .cards-grid');
    const projectTimeline = document.querySelector('#projetos .timeline');
    let selectedProfile = null;

    function language() { return document.documentElement.lang.startsWith('en') ? 'en' : 'pt'; }
    function reorder(container, selector, order) {
        const elements = new Map([...container.querySelectorAll(selector)].map(element => [element.dataset.experience || element.dataset.project, element]));
        order.forEach(key => { if (elements.has(key)) container.append(elements.get(key)); });
    }
    function applyProfile(profileId, persist = true) {
        const profile = profiles[profileId] || profiles.visitor;
        selectedProfile = profiles[profileId] ? profileId : 'visitor';
        document.body.dataset.profile = selectedProfile;
        reorder(experienceGrid, '[data-experience]', profile.experiences);
        reorder(projectTimeline, '[data-project]', profile.projects);
        updateLanguage();
        if (persist) { try { localStorage.setItem(storageKey, selectedProfile); } catch { /* mantém a sessão atual */ } }
        window.dispatchEvent(new CustomEvent('portfolio:profilechange', { detail: { profile: selectedProfile } }));
    }
    function updateLanguage() {
        if (!selectedProfile) return;
        const profile = profiles[selectedProfile]; const lang = language();
        label.textContent = profile.label[lang]; context.textContent = profile.context[lang];
    }
    function openDialog() { closeButton.hidden = !selectedProfile; dialog.showModal(); }

    changeButton.addEventListener('click', openDialog);
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog && selectedProfile) dialog.close(); });
    dialog.addEventListener('cancel', event => { if (!selectedProfile) event.preventDefault(); });
    dialog.querySelectorAll('[data-profile]').forEach(button => button.addEventListener('click', () => { applyProfile(button.dataset.profile); dialog.close(); }));
    document.getElementById('lang-pt').addEventListener('click', () => setTimeout(updateLanguage));
    document.getElementById('lang-en').addEventListener('click', () => setTimeout(updateLanguage));

    let savedProfile = null;
    try { savedProfile = localStorage.getItem(storageKey); } catch { /* armazenamento pode estar bloqueado */ }
    if (profiles[savedProfile]) applyProfile(savedProfile, false); else openDialog();
});

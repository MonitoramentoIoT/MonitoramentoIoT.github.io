/**
 * js/main.js
 *
 * (v3 - Modo Visitante atualizado: adiciona classe ao body)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE MODO VISITANTE (ATUALIZADA) ---
    const urlParams = new URLSearchParams(window.location.search);
    const IS_GUEST_MODE = urlParams.get('mode') === 'guest';

    if (IS_GUEST_MODE) {
        console.warn("Modo Visitante ATIVADO. Controlos e Configurações escondidos.");
        
        // 1. Esconder o link da aba "Configurações"
        const linkConfig = document.querySelector('.nav-link[data-page="page-configuracoes"]');
        if (linkConfig) {
            linkConfig.classList.add('hidden');
        }
        
        // 2. (NOVO) Adiciona a classe 'is-guest' ao BODY.
        // O CSS irá tratar de esconder os controlos (toggles).
        document.body.classList.add('is-guest');
        
        // 3. (REMOVIDO) Não escondemos mais a secção inteira
        // const secaoControle = document.getElementById('secao-controle-cargas');
        // if (secaoControle) {
        //     secaoControle.classList.add('hidden');
        // }
    }
    // --- FIM DA LÓGICA DE VISITANTE ---


    // --- 1. Seletores da Navegação ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');

    // --- 2. Seletores do Menu Mobile ---
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    const btnMenuMobile = document.getElementById('btn-menu-mobile');

    // --- 3. Função para mostrar/esconder a aba ---
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.remove('hidden');
        }
    }

    // --- 4. Funções para Abrir/Fechar o Menu Mobile ---
    function openMobileMenu() {
        if (sidebar) sidebar.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
    }

    function closeMobileMenu() {
        if (sidebar) sidebar.classList.add('-translate-x-full');
        if (backdrop) backdrop.classList.add('hidden');
    }

    // --- 5. Adiciona "Ouvintes" de Eventos ---
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            const pageIdToShow = link.getAttribute('data-page');
            showPage(pageIdToShow);
            closeMobileMenu(); 
        });
    });

    if (btnMenuMobile) {
        btnMenuMobile.addEventListener('click', openMobileMenu);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileMenu);
    }

    // --- 6. Inicialização ---
    showPage('page-realtime'); // Mostra a primeira página

});

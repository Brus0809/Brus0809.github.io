// ============================================
//   MOBILE MENU
// ============================================

function initMobileMenu() {

    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {

        toggle.classList.toggle('active');
        menu.classList.toggle('active');

        document.body.style.overflow =
            menu.classList.contains('active')
                ? 'hidden'
                : '';

    });

    links.forEach(link => {

        link.addEventListener('click', () => {

            toggle.classList.remove('active');
            menu.classList.remove('active');

            document.body.style.overflow = '';

        });

    });

}
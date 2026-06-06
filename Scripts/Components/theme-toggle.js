function initThemeToggle() {

    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme');

    if (
        savedTheme === 'dark' ||
        (
            !savedTheme &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    ) {
        root.setAttribute('data-theme', 'dark');
    }

    if (!toggle) return;

    toggle.addEventListener('click', () => {

        const currentTheme = root.getAttribute('data-theme');

        if (currentTheme === 'dark') {

            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');

        } else {

            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');

        }

    });

}
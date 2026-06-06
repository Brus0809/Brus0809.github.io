/* === Image Modal === */
function initImageModal() {

    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal || !modalImage || !closeBtn) {
        return;
    }

    document.querySelectorAll('.feature-preview').forEach(img => {

        img.addEventListener('click', () => {

            modalImage.src = img.src;
            modalImage.alt = img.alt;

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}
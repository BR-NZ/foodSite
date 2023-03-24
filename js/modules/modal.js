function modal() {
    // POPUP

    const btnsModal = document.querySelectorAll('*[data-modal]'),
        modalPopup = document.querySelector('.modal');

    function closeModal(modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    function showModal(modal) {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerID);
    }

    btnsModal.forEach(item => {
        item.addEventListener('click', () => showModal(modalPopup));
    });

    modalPopup.addEventListener('click', (e) => {
        if (e.target === modalPopup || e.target.getAttribute('data-close') === '') closeModal(modalPopup);
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalPopup.classList.contains('show')) closeModal(modalPopup);
    });

    const modalTimerID = setTimeout(() => showModal(modalPopup), 50000);

    function showModalOnScroll() {
        if (document.documentElement.scrollHeight === document.documentElement.clientHeight + window.pageYOffset) {
            showModal(modalPopup);
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }
    window.addEventListener('scroll', showModalOnScroll);
}

module.exports = modal;
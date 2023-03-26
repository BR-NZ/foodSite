function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    console.log(modalTimerID);
    if(modalTimerID) clearTimeout(modalTimerID);
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    const btnsModal = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    btnsModal.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') closeModal(modalSelector);
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) closeModal(modalSelector);
    });

    function showModalOnScroll() {
        if (document.documentElement.scrollHeight === document.documentElement.clientHeight + window.pageYOffset) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }
    window.addEventListener('scroll', showModalOnScroll);
}

export {openModal, closeModal};
export default modal;
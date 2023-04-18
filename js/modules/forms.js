import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerID) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: '/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Показываем спиннер
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', statusMessage);
            // Собираю объект формы и трансформирую в простой объект
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            // Постим данные на сервер и работаем с ними
            postData('http://localhost:3000/requests', JSON.stringify(formDataObj))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal('.modal', modalTimerID);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 3500);
    }
}

export default forms;
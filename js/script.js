window.addEventListener('DOMContentLoaded', () => {

    // TABS

    const tabsParent = document.querySelector('.tabheader__items'), 
          tabs = document.querySelectorAll('.tabheader__item'), 
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            hideTabContent();
            tabs.forEach((item, i) => {
                if (item === e.target) {
                    showTabContent(i);
                }
            });
        }
    })

    // TIMER

    const deadline = '2023-03-21';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) {
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    function getZero(n) {
        if(n >= 0 && n < 10) return `0${n}`;
        else return n;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              daysBlock = timer.querySelector('#days'),
              hoursBlock = timer.querySelector('#hours'),
              minutesBlock = timer.querySelector('#minutes'),
              secondsBlock = timer.querySelector('#seconds');
        
        const timerID = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            daysBlock.textContent = getZero(t.days);
            hoursBlock.textContent = getZero(t.hours);
            minutesBlock.textContent = getZero(t.minutes);
            secondsBlock.textContent = getZero(t.seconds);

            if (t.total <= 0) clearInterval(timerID);
        }
    }

    setClock('.timer', deadline);

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
        if(e.code === 'Escape' && modalPopup.classList.contains('show')) closeModal(modalPopup);
    });

    const modalTimerID = setTimeout(() => showModal(modalPopup), 50000);

    function showModalOnScroll() {
        if(document.documentElement.scrollHeight === document.documentElement.clientHeight + window.pageYOffset) {
            showModal(modalPopup);
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }
    window.addEventListener('scroll', showModalOnScroll);

    // CARDS

    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            </div>
            `;
            this.parent.append(menuItem);
        }
    }

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // FORMs

    const forms = document.querySelectorAll('form');
    const message = {
        loading: '/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => bindPostData(item));

    async function getResource(url) {
        const res = await fetch(url);

        if(!res.ok) throw new Error(`Не могу сфетчить URL: ${url}, статус сервера: ${res.status}`);

        return await res.json();
    }

    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data,
        });
        return await res.json();
    };

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
            const formDataObj = Object.fromEntries( formData.entries() );
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

        showModal(modalPopup);
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
            closeModal(modalPopup);
        }, 3500);
    }

    // SLIDER

    const slider = {
        nodes: document.querySelectorAll('.offer__slide'),
        wrapper: document.querySelector('.offer__slider-wrapper'),
        inner: document.querySelector('.offer__slider-inner'),
        width: document.querySelector('.offer__slider-wrapper').offsetWidth,
        next: document.querySelector('.offer__slider-next'),
        prev: document.querySelector('.offer__slider-prev'),
        total: document.getElementById('total'),
        count: document.querySelectorAll('.offer__slide').length,
        curr: document.getElementById('current'),
        dots: document.createElement('ul'),
        index: 1,
        offset: 0
    };

    function setDots(n) {
        
        slider.dotsList.forEach(item => item.classList.remove('active'));
        slider.dotsList[n - 1].classList.add('active');
    }

    slider.inner.style.width = slider.count * 100 + '%';
    slider.inner.style.transition = '0.5s all'
    slider.wrapper.style.position = 'relative';
    slider.nodes.forEach(slide => slide.style.width = slider.width);
    slider.total.textContent = getZero(slider.count);
    slider.curr.textContent = getZero(slider.index);

    slider.dots.classList.add('dots-inner');
    slider.wrapper.append(slider.dots);
    for(let i = 0; i < slider.count; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide', i + 1);
        slider.dots.append(dot);

        if(i === 0) dot.classList.add('active');
    }
    slider.dotsList = document.querySelectorAll('.dot');
    slider.dots.addEventListener('click', (e) => {
        if(e.target.hasAttribute('data-slide')) {
            const index = e.target.getAttribute('data-slide');
            slider.inner.style.transform = `translateX(${-(index - 1) * slider.width}px)`;
            setDots(index)
        } 
    });

    slider.next.addEventListener('click', (e) => {
        slider.offset -= slider.width;
        slider.index++;
        if(slider.index > slider.count) slider.index = 1;
        if(slider.offset < -(slider.count - 1) * slider.width) slider.offset = 0;
        slider.inner.style.transform = `translateX(${slider.offset}px)`;
        slider.curr.textContent = getZero(slider.index);
        setDots(slider.index);
    });
    slider.prev.addEventListener('click', (e) => {
        slider.offset += slider.width;
        slider.index--;
        if(slider.index < 1) slider.index = slider.count;
        if(slider.offset > 0) slider.offset = -(slider.count - 1) * slider.width;
        slider.inner.style.transform = `translateX(${slider.offset}px)`;
        slider.curr.textContent = getZero(slider.index);
        setDots(slider.index);
    });

    // CALC

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ratio = 1.375;

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }
        let resultText = 0;
        if(sex === 'female') {
            resultText = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            resultText = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }

        result.textContent = Math.round(resultText);
    }

    calcTotal();

    function getStaticInfo(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(`${parentSelector}`).addEventListener('click', (e) => {
            if(e.target.hasAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                sex = e.target.getAttribute('id');
            } 
            if(e.target.classList.contains('calculating__choose-item')) {
                elements.forEach(item => item.classList.remove(`${activeClass}`));
                e.target.classList.add(`${activeClass}`);    
            }

            calcTotal();
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        })
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
});
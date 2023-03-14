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

    // Modal pop-up

    const btnsModal = document.querySelectorAll('*[data-modal]'),
          modalPopup = document.querySelector('.modal'),
          btnModalClose = modalPopup.querySelector('*[data-close]');

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

    btnModalClose.addEventListener('click', () => closeModal(modalPopup));

    modalPopup.addEventListener('click', (e) => {
        if (e.target === modalPopup) closeModal(modalPopup);
    })

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modalPopup.classList.contains('show')) closeModal(modalPopup);
    });

    const modalTimerID = setTimeout(() => showModal(modalPopup), 5000);

    function showModalOnScroll() {
        if(document.documentElement.scrollHeight === document.documentElement.clientHeight + window.pageYOffset) {
            showModal(modalPopup);  
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }
    window.addEventListener('scroll', showModalOnScroll);
});
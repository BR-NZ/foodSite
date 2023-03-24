function calc() {
    // CALC

    function initLocalStorage(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    function getStaticInfo(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(`${parentSelector}`).addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }
            if (e.target.classList.contains('calculating__choose-item')) {
                elements.forEach(item => item.classList.remove(`${activeClass}`));
                e.target.classList.add(`${activeClass}`);
            }
            calcTotal();
        });
    }

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }

            switch (input.getAttribute('id')) {
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

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }
        let resultText = 0;
        if (sex === 'female') {
            resultText = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            resultText = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }

        result.textContent = Math.round(resultText);
    }

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age;
    height = localStorage.height ? localStorage.height : '';
    weight = localStorage.weight ? localStorage.weight : '';

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    initLocalStorage('#gender', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big', 'calculating__choose-item_active');
    calcTotal();
    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

module.exports = calc;
function slider() {
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
    for (let i = 0; i < slider.count; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide', i + 1);
        slider.dots.append(dot);

        if (i === 0) dot.classList.add('active');
    }
    slider.dotsList = document.querySelectorAll('.dot');
    slider.dots.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-slide')) {
            const index = e.target.getAttribute('data-slide');
            slider.inner.style.transform = `translateX(${-(index - 1) * slider.width}px)`;
            setDots(index)
        }
    });

    slider.next.addEventListener('click', (e) => {
        slider.offset -= slider.width;
        slider.index++;
        if (slider.index > slider.count) slider.index = 1;
        if (slider.offset < -(slider.count - 1) * slider.width) slider.offset = 0;
        slider.inner.style.transform = `translateX(${slider.offset}px)`;
        slider.curr.textContent = getZero(slider.index);
        setDots(slider.index);
    });
    slider.prev.addEventListener('click', (e) => {
        slider.offset += slider.width;
        slider.index--;
        if (slider.index < 1) slider.index = slider.count;
        if (slider.offset > 0) slider.offset = -(slider.count - 1) * slider.width;
        slider.inner.style.transform = `translateX(${slider.offset}px)`;
        slider.curr.textContent = getZero(slider.index);
        setDots(slider.index);
    });
}

module.exports = slider;
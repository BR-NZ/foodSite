import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('*[data-modal]', '.modal', modalTimerID);
    timer('.timer', '2023-07-21');
    cards();
    calc();
    forms('form', modalTimerID);
    slider({
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        total: '#total',
        curr: '#current',
        index: 1,
        offset: 0
    });
});
function getZero(n) {
    if (n >= 0 && n < 10) return `0${n}`;
    else return n;
}

function timer(id, deadline) {
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
}

export {getZero};
export default timer;
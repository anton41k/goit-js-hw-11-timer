const ref = {
    day: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
}
const countDownDate = new Date("Jul 5, 2021 22:56:25").getTime();

class Timer{
    constructor({onTick}) {
        this.intervalID = null;
        this.onTick = onTick;
    }

    start() {
        this.intervalID = setInterval( () => {
            const nowTimer = new Date().getTime();
            const deltaTimer = countDownDate - nowTimer;
    
            this.onSetTimer(deltaTimer);
            if (deltaTimer < 0) {
                this.stop()
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalID);
        this.onSetTimer(0);
    }

    onSetTimer(deltaTimer) {
        const timer = getTimeComponents(deltaTimer);
        this.onTick(timer);
    }
}

const timer = new Timer({
    onTick: updateTimerFace
});
timer.start()

function pad(value) {
    return String(value).padStart(2, "0")
}

function getTimeComponents(time){
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    return {days, hours, mins, secs}
}

function updateTimerFace({days, hours, mins, secs}) {
    ref.day.textContent = days;
    ref.hours.textContent = hours;
    ref.mins.textContent = mins;
    ref.secs.textContent = secs;
}

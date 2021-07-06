const ref = {
    dayValue: document.querySelector('span[data-value="days"]'),
    hoursValue: document.querySelector('span[data-value="hours"]'),
    minsValue: document.querySelector('span[data-value="mins"]'),
    secsValue: document.querySelector('span[data-value="secs"]'),

    dayLabel: document.querySelector('span[data-value="days"]'),
    hoursLabel: document.querySelector('span[data-value="hours"]'),
    minsLabel: document.querySelector('span[data-value="mins"]'),
    secsLabel: document.querySelector('span[data-value="secs"]'),
}
const countDownDate = new Date("Jul 30, 2021 22:56:25").getTime();

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
    onTick: updateTimerValue
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

function updateTimerValue({days, hours, mins, secs}) {
    ref.dayValue.textContent = days;
    ref.hoursValue.textContent = hours;
    ref.minsValue.textContent = mins;
    ref.secsValue.textContent = secs;
}

function updateTimerLabel({days, hours, mins, secs}) {
    ref.dayLabel.textContent = days;
    ref.hoursLabel.textContent = hours;
    ref.minsLabel.textContent = mins;
    ref.secsLabel.textContent = secs;
}

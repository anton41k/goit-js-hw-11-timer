class CountdownTimer{
    constructor({selector, targetDate}) {
        this.intervalID = null;
        this.selector = selector
        this.targetDate = targetDate;
        this.ref = {
            dayValue: document.querySelector(`${this.selector} span[data-value="days"]`),
            hoursValue: document.querySelector(`${this.selector} span[data-value="hours"]`),
            minsValue: document.querySelector(`${this.selector} span[data-value="mins"]`),
            secsValue: document.querySelector(`${this.selector} span[data-value="secs"]`)
        };
        this.start()
    }

    start() {
        this.intervalID = setInterval( () => {
            const nowTimer = new Date().getTime();
            const deltaTimer = this.targetDate - nowTimer;
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

    onUpdateTimerValue({days, hours, mins, secs}) {
        this.ref.dayValue.textContent = days;
        this.ref.hoursValue.textContent = hours;
        this.ref.minsValue.textContent = mins;
        this.ref.secsValue.textContent = secs;
    }
    
    onPad(value) {
        return String(value).padStart(2, "0")
    }

    onGetTimeComponents(time){
        const days = this.onPad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.onPad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.onPad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.onPad(Math.floor((time % (1000 * 60)) / 1000));
        return {days, hours, mins, secs}
    }

    onSetTimer(deltaTimer) {
        const timer = this.onGetTimeComponents(deltaTimer);
        this.onUpdateTimerValue(timer);
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date("Jul 30, 2021 22:56:25").getTime()
});

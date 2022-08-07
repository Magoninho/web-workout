export default class Timer {
    constructor(seconds) {
        this.hasEnded = false;
        this.seconds = seconds;
    }
    tick() {
        if (this.seconds <= 0) {
            this.hasEnded = true;
            return;
        }
        this.seconds--;
    }
    // public start() {
    // 	this.interval = setInterval(this.tick.bind(this), 1000);
    // }
    getTimerText() {
        let minutes = Math.floor(this.seconds / 60);
        return this.seconds >= 10 ? `${minutes}:${this.seconds - (minutes * 60)}` : `${minutes}:0${this.seconds - (minutes * 60)}`;
    }
}
//# sourceMappingURL=timer.js.map
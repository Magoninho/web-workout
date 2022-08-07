export default class Timer {
	private seconds: number;
	public hasEnded: boolean = false;
	private initialSeconds: number;

	constructor(seconds: number) {
		this.seconds = seconds;
		this.initialSeconds = this.seconds;
	}

	/**
	 * This method ticks the timer, making seconds going down by 1
	 * 
	 */
	public tick() {
		if (this.seconds <= 0) {
			this.hasEnded = true;
			return;
		}
		this.seconds--;
	}

	/**
	 * This method will make the seconds go back to its initial value
	 */
	public reset() {
		this.seconds = this.initialSeconds;
		this.hasEnded = false; 
	}

	/**
	 * This method returns a string with the time
	 */
	public getTimerText(): string {
		let minutes = Math.floor(this.seconds / 60);
		return this.seconds >= 10 ? `${minutes}:${this.seconds - (minutes * 60)}` : `${minutes}:0${this.seconds - (minutes * 60)}`;
	}
}
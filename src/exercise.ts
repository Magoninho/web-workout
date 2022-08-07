import Timer from "./timer.js";

export default class Exercise {
	public name: string;
	// if the exercise is timed, then seconds will be displayed
	// else, only the number of repetitions will be.
	public timed: boolean;
	public seconds: number = null;
	public reps: number = null;
	private timer: Timer;
	public imageURL: string = null;

	constructor(name: string, imageURL: string, timed: boolean) {
		this.name = name;
		this.timed = timed;
		this.imageURL = imageURL;
	}

	/**
	 * This method sets the time, in seconds, that the exercise will have
	 * Obs: If the exercise is not timed, an error occurs.
	 * @param seconds The time in seconds
	 */
	public setTime(seconds: number) {
		if (this.timed) {
			this.seconds = seconds;
			this.timer = new Timer(this.seconds);
		} else throw "Error: This exercise is does not have time, only reps.";
	}

	/**
	 * This method sets the number of reps that the exercise will have
	 * Obs: If the exercise is timed, an error occurs.
	 * @param reps The number of reps
	 */
	public setReps(reps: number) {
		if (!this.timed) {
			this.reps = reps;
		} else throw "Error: This exercise is timed.";
	}

	public getName(): string {
		return this.name;
	}

	public getReps(): number {
		return this.reps;
	}

	public getTimer(): Timer {
		return this.timer;
	}
	
	public getImageURL(): string {
		return this.imageURL;
	}

	public isTimed(): boolean {
		return this.timed;
	}
}
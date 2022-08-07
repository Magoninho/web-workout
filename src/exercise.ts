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

	public setTime(seconds: number) {
		if (this.timed) {
			this.seconds = seconds;
			this.timer = new Timer(this.seconds);
		} else throw "Error: This exercise is does not have time, only reps.";
	}

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
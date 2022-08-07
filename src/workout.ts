import TimeText from "./timeRenderer.js";

const timeDiv = document.querySelector("#time") as HTMLDivElement;
const workoutDiv = document.querySelector("#workout") as HTMLDivElement;
const title = document.querySelector("#title") as HTMLHeadingElement;
const image = document.querySelector("#image") as HTMLImageElement;
const resultText = document.querySelector("#results") as HTMLParagraphElement;

export default class Workout {
	public workoutObj: object;
	public name: string;
	public minutes: number; // will be calculated later
	public timers: TimeText[];
	public exercises: object;
	public numOfExercises: number;
	public numOfSets: number = 1;
	private intervals: any[];
	private index: number = 0;


	constructor(workoutObj: object) {
		this.workoutObj = workoutObj;
		this.name = this.workoutObj['workoutName'];
		this.exercises = this.workoutObj['exercises'];
		if (this.workoutObj['sets']) this.numOfSets = this.workoutObj['sets'];
		this.minutes = this.getTotalSeconds() / 60;

		this.numOfExercises = Object.keys(this.exercises).length;
		this.intervals = new Array(this.numOfExercises * this.numOfSets);

		// creates a new array with the number of exercises as length
		this.timers = new Array(this.numOfExercises * this.numOfSets);
		// assigns each exercise seconds to the timers
		for (let i = 0; i < this.timers.length; i++) {
			let keynames = Object.keys(this.exercises);
			this.timers[i] = new TimeText(this.exercises[keynames[i % this.numOfExercises]].seconds);
		}
	}

	public start() {
		this.renderInfo();
		timeDiv.innerText = this.timers[this.index].getTimerText();

		this.intervals[this.index] = setInterval(() => {


			if (this.timers[this.index].hasEnded) {
				clearInterval(this.intervals[this.index]);
				if (this.timers[this.index + 1] == undefined) {
					workoutDiv.style.display = "none";
					this.renderResults();
					return;
				}
				// TODO: rest
				this.index++;
				this.start(); // recursion lol
			} else {
				timeDiv.innerText = this.timers[this.index].getTimerText();
				this.timers[this.index].tick();
			}


		}, 1000);
	}

	public getTotalSeconds() {
		let exercises = this.workoutObj['exercises'];
		let seconds = 0;

		for (const key in exercises) {
			if (Object.prototype.hasOwnProperty.call(exercises, key)) {
				const e = exercises[key];
				seconds += e['seconds'];
			}
		}
		return seconds;
	}

	// this render method renders the info once when called
	private renderInfo() {
		let keynames = Object.keys(this.exercises);
		let exerciseImage = this.exercises[keynames[this.index % this.numOfExercises]].image;
		let exerciseName = keynames[this.index % this.numOfExercises];

		document.getElementById("input").style.display = "none";


		title.innerText = exerciseName;

		// picking the current exercise image
		if (exerciseImage) image.src = exerciseImage;
	}

	private renderResults() {

		resultText.innerText = `
		Time spent: ${Math.round(this.minutes * 10) / 10} minutes
		Exercises made: ${this.numOfExercises * this.numOfSets}

		`;
	}
}
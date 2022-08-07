import Exercise from "./exercise.js";
import Timer from "./timer.js";

const timeDiv = document.querySelector("#time") as HTMLDivElement;
const workoutDiv = document.querySelector("#workout") as HTMLDivElement;
const title = document.querySelector("#title") as HTMLHeadingElement;
const image = document.querySelector("#image") as HTMLImageElement;
const resultText = document.querySelector("#results") as HTMLParagraphElement;

export default class Workout {
	public workoutObj: object;
	public name: string;
	public minutes: number; // will be calculated later
	public timers: Timer[];
	public exercises: Exercise[];
	public numOfExercises: number;
	public numOfSets: number = 1;
	private index: number = 0;
	private enableResting: boolean;
	private restTime: number;
	private setsRemaining: number;


	constructor(workoutObj: object) {
		this.workoutObj = workoutObj;
		this.name = this.workoutObj['workoutName'];
		this.numOfExercises = Object.keys(this.workoutObj['exercises']).length;
		this.exercises = new Array(this.numOfExercises);
		for (let e = 0; e < this.exercises.length; e++) {
			let exercisesDict = this.workoutObj['exercises'];
			let names: string[] = Object.keys(exercisesDict);
			let timed: boolean = true; // if the exercise will be timed or not
			let exercise_element = exercisesDict[names[e]];
			let imageURL: string = exercise_element['image'];

			// check if there is a property called 'reps' to make timed = false
			if (exercisesDict[names[e]]['reps']) timed = false;
			this.exercises[e] = new Exercise(names[e], imageURL, timed);

			if (timed) this.exercises[e].setTime(exercisesDict[names[e]]['seconds']);
			else this.exercises[e].setReps(exercisesDict[names[e]]['reps']);
		}


		if (this.workoutObj['sets']) this.numOfSets = this.workoutObj['sets'];

		// checks if there is a rest setting in the json, then applies this information
		this.enableResting = this.workoutObj['restTime'] !== undefined;
		if (this.enableResting) this.restTime = this.workoutObj['restTime'];

		this.setsRemaining = this.numOfSets;
	}

	public start() {

		let currentExercise: Exercise = this.exercises[this.index];
		
		console.log(this.setsRemaining)		;
		
		// if there is no exercise next
		if (currentExercise == undefined) {
			// but if the set is not the last (which is 1)
			if (this.setsRemaining != 1) {
				// go back to the first exercise
				this.index = 0;
				this.setsRemaining--;
				this.start();
				return;
			}

			workoutDiv.style.display = "none";
			this.renderResults();
			return;
		}

		this.renderInfo();

		if (currentExercise.isTimed()) {
			timeDiv.innerText = currentExercise.getTimer().getTimerText();

			let interval = setInterval(() => {
				if (currentExercise.getTimer().hasEnded) {
					clearInterval(interval);

					if (this.enableResting) {
						this.rest();
					} else {
						this.index++; // goes to the next index
						console.log("aslkdfj")
						this.start(); // recursion lol
					}
					
				} else {
					timeDiv.innerText = currentExercise.getTimer().getTimerText();
					currentExercise.getTimer().tick();
				}


			}, 1000);

		} else {
			let reps = currentExercise.getReps();
			timeDiv.innerText = `${reps}x`;

			let next_btn = document.createElement("button");
			next_btn.innerText = "Next";

			next_btn.onclick = () => {

				// TODO: turn this into a function?
				if (this.enableResting) {
					this.rest();
				} else {
					this.index++;
					this.start();
				}
			};
			timeDiv.appendChild(document.createElement("br"));
			timeDiv.appendChild(next_btn);
		}
	}

	private rest() {
		let restTimer = new Timer(this.restTime);

		timeDiv.innerText = restTimer.getTimerText();
		title.innerText = "Rest";
		image.src = "./assets/clock.svg";

		let restInterval = setInterval(() => {

			if (restTimer.hasEnded) {
				clearInterval(restInterval);
				this.index++; // goes to the next index
				this.start();
			} else {
				timeDiv.innerText = restTimer.getTimerText();
				restTimer.tick();
			}

		}, 1000);
	}

	// this render method renders the info once when called
	private renderInfo() {
		let exerciseImage: string = this.exercises[this.index].getImageURL();
		let exerciseName = this.exercises[this.index].getName();

		document.getElementById("input").style.display = "none";


		title.innerText = exerciseName;

		// picking the current exercise image
		if (exerciseImage) image.src = exerciseImage;
	}

	private renderResults() {

		resultText.innerHTML = `
		<b>Results:</b><br>
		Exercises made: ${this.numOfExercises * this.numOfSets}
		`;
	}
}
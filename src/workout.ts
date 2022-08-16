import Exercise from "./exercise.js";
import ImageUtils from "./ImageUtils.js";
import Progress from "./progress.js";
import Timer from "./timer.js";

const timeDiv = document.querySelector("#time") as HTMLDivElement;
const workoutDiv = document.querySelector("#workout") as HTMLDivElement;
const image = document.querySelector("#image") as HTMLImageElement;
const resultText = document.querySelector("#results") as HTMLParagraphElement;
const alarm = document.querySelector("#alarm") as HTMLAudioElement;
const info_div = document.querySelector("#info") as HTMLDivElement;
const loading_div = document.querySelector("#loading-div") as HTMLDivElement;

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
	private images: HTMLImageElement[];
	private clockImage: HTMLImageElement;
	private progress: Progress;


	constructor(workoutObj: object) {
		this.workoutObj = workoutObj;
		this.name = this.workoutObj['workoutName'];
		this.numOfExercises = Object.keys(this.workoutObj['exercises']).length;
	}

	/**
	 * This method will:
	 * - create exercises from the json information
	 * - define which exercises are timed and which are not, and define how many seconds
	 * - checks if this workout allows resting, and if so, define how many seconds
	 * - loads the clock image
	 * - define the number of sets
	 * - define the number of setsRemaining (will be used in the start() method)
	 */
	public async start() {

		if (this.numOfExercises <= 0) {
			alert("Error: No Exercises");
			window.location.reload();
			return;
		}

		this.exercises = new Array(this.numOfExercises);
		this.images = new Array(this.numOfExercises);
		this.progress = new Progress(this.numOfExercises, loading_div);

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

			// adding new images to the images array
			this.images[e] = await ImageUtils.loadImageFromUrl(imageURL);
			this.images[e].classList.add("exercise-image");
			this.progress.addProgress("Loading images");
		}

		this.clockImage = await ImageUtils.loadImageFromUrl("./assets/clock.svg");
		this.clockImage.classList.add("exercise-image");

		if (this.workoutObj['sets']) this.numOfSets = this.workoutObj['sets'];

		// checks if there is a rest setting in the json, then applies this information
		this.enableResting = this.workoutObj['restTime'] !== undefined;
		if (this.enableResting) this.restTime = this.workoutObj['restTime'];

		this.setsRemaining = this.numOfSets;

		this.progress.removeProgressPopUp();


		// Finally begin the exercises!
		this.exerciseStart();
	}

	private exerciseStart() {
		let currentExercise: Exercise = this.exercises[this.index];

		// if there is no exercise next
		if (currentExercise == undefined) {
			// but if the set is not the last (which is 1)
			if (this.setsRemaining != 1) {
				// go back to the first exercise
				this.index = 0;
				this.setsRemaining--;

				// reset the timers from the exercises that have timers
				for (const exercise of this.exercises) {
					if (exercise.isTimed()) {
						exercise.getTimer().reset();
					}
				}

				this.exerciseStart();
				return;
			}

			// if its the last set, then finish it up
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
					alarm.play();
					this.nextExercise();
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
				this.nextExercise();
			};
			timeDiv.appendChild(document.createElement("br"));
			timeDiv.appendChild(next_btn);
		}
	}

	private rest() {
		let restTimer = new Timer(this.restTime);

		info_div.innerHTML = ""; // clears the div

		timeDiv.innerText = restTimer.getTimerText();

		let title = document.createElement("h1");
		title.innerText = "Rest";

		info_div.appendChild(title);
		info_div.appendChild(this.clockImage);


		let restInterval = setInterval(() => {

			if (restTimer.hasEnded) {
				clearInterval(restInterval);
				alarm.play();
				this.index++; // goes to the next index
				this.exerciseStart();
			} else {
				timeDiv.innerText = restTimer.getTimerText();
				restTimer.tick();
			}

		}, 1000);
	}

	private nextExercise() {
		if (this.enableResting && !this.isOnLastExercise()) {
			this.rest();
		} else {
			this.index++;
			this.exerciseStart();
		}
	}

	private isOnLastExercise(): boolean {
		return (this.exercises[this.index + 1] == undefined && this.setsRemaining == 1);
	}

	// this method renders the info once when called
	private renderInfo() {

		info_div.innerHTML = ""; // clears the div

		let exerciseImage: HTMLImageElement = this.images[this.index];
		let exerciseName = this.exercises[this.index].getName();

		// this little math will make something like
		// 3 sets remaining, so we are in set 1
		// 2 sets remaining, so we are in set 2
		// 1 sets remaining, so we are in set 3
		let currentSet = this.numOfSets - (this.setsRemaining - 1);

		document.getElementById("input").style.display = "none";


		let title = document.createElement("h1");
		title.innerText = `${ordinal_suffix_of(currentSet)} set\n${exerciseName}`;

		info_div.appendChild(title);
		// picking the current exercise image
		if (exerciseImage) info_div.appendChild(exerciseImage);
	}

	private renderResults() {

		resultText.innerHTML = `
		<b>Results:</b><br>
		Exercises made: ${this.numOfExercises * this.numOfSets}
		`;
	}
}

// https://stackoverflow.com/a/13627586
function ordinal_suffix_of(i: number): string {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}
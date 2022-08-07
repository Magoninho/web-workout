import TimeText from "./timeRenderer.js";
const timeDiv = document.querySelector("#time");
const workoutDiv = document.querySelector("#workout");
const title = document.querySelector("#title");
const image = document.querySelector("#image");
const resultText = document.querySelector("#results");
export default class Workout {
    constructor(workoutObj) {
        this.numOfSets = 1;
        this.index = 0;
        this.workoutObj = workoutObj;
        this.name = this.workoutObj['workoutName'];
        this.exercises = this.workoutObj['exercises'];
        if (this.workoutObj['sets'])
            this.numOfSets = this.workoutObj['sets'];
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
    start() {
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
            }
            else {
                timeDiv.innerText = this.timers[this.index].getTimerText();
                this.timers[this.index].tick();
            }
        }, 1000);
    }
    getTotalSeconds() {
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
    renderInfo() {
        let keynames = Object.keys(this.exercises);
        let exerciseImage = this.exercises[keynames[this.index % this.numOfExercises]].image;
        let exerciseName = keynames[this.index % this.numOfExercises];
        document.getElementById("input").style.display = "none";
        title.innerText = exerciseName;
        // picking the current exercise image
        if (exerciseImage)
            image.src = exerciseImage;
    }
    renderResults() {
        resultText.innerText = `
		Time spent: ${Math.round(this.minutes * 10) / 10} minutes
		Exercises made: ${this.numOfExercises * this.numOfSets}

		`;
    }
}
//# sourceMappingURL=workout.js.map
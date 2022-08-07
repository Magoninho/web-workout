import Timer from "./timer.js";
export default class Exercise {
    constructor(name, imageURL, timed) {
        this.seconds = null;
        this.reps = null;
        this.imageURL = null;
        this.name = name;
        this.timed = timed;
        this.imageURL = imageURL;
    }
    /**
     * This method sets the time, in seconds, that the exercise will have
     * Obs: If the exercise is not timed, an error occurs.
     * @param seconds The time in seconds
     */
    setTime(seconds) {
        if (this.timed) {
            this.seconds = seconds;
            this.timer = new Timer(this.seconds);
        }
        else
            throw "Error: This exercise is does not have time, only reps.";
    }
    /**
     * This method sets the number of reps that the exercise will have
     * Obs: If the exercise is timed, an error occurs.
     * @param reps The number of reps
     */
    setReps(reps) {
        if (!this.timed) {
            this.reps = reps;
        }
        else
            throw "Error: This exercise is timed.";
    }
    getName() {
        return this.name;
    }
    getReps() {
        return this.reps;
    }
    getTimer() {
        return this.timer;
    }
    getImageURL() {
        return this.imageURL;
    }
    isTimed() {
        return this.timed;
    }
}
//# sourceMappingURL=exercise.js.map
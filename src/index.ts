import Workout from "./workout.js";

let fileInput = document.getElementById('file-upload');
let workoutfile = fileInput.files[0];
let workoutText = "";
fileInput.addEventListener("change", handleFiles, false);
const reader = new FileReader();

function handleFiles() {
	const fileList =  this.files;
	reader.onload = (evt) => {
		workoutText = String(evt.target.result);
	}

	reader.readAsText(fileList[0]);
}



let btn = document.querySelector("#start-btn") as HTMLButtonElement;

btn.addEventListener("click", () => {

	try {
		let workout = new Workout(JSON.parse(workoutText));
		workout.start();
	} catch (e) {
		alert("JSON error:\n" + e);
	}

});
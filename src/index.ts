import Workout from "./workout.js";

// TODO: get from json
let workoutjson =
	`
{
	"workoutName": "Abs workout 3 minutes",

	"exercises": {
		"sit ups": {
			"seconds": 2,
			"image": "./assets/cat.png"
		},

		"plank": {
			"seconds": 2,
			"image": "./assets/cat2.png"
		}
	}
}
`

let mydiv = document.querySelector("#workout") as HTMLDivElement;

let workout = new Workout(JSON.parse(workoutjson));

workout.start();
// workout.render(mydiv);

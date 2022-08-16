// Code to transform the form data into a javascript object

import PopUp from "../popUp.js";

const formElement: HTMLFormElement = document.getElementById("myForm") as HTMLFormElement;
let exerciseCounter = 0; // exercise count
// function getFormJSON(form: HTMLFormElement): object {
// 	const data = new FormData(form);
// 	return Array.from(data.keys()).reduce((result, key) => {
// 		result[key] = data.get(key);
// 		return result;
// 	}, {});
// }

// function handler(event: Event) {
// 	event.preventDefault();
// 	const valid = formElement.reportValidity();
// 	if (valid) {
// 		const result = getFormJSON(formElement);
// 		console.log(result);
// 	}
// }

// formElement.addEventListener("submit", handler);

let final_obj: object = {};

let name_input: HTMLInputElement = document.getElementById("name") as HTMLInputElement;
let rest_input: HTMLInputElement = document.getElementById("restTime") as HTMLInputElement;
let sets_input: HTMLInputElement = document.getElementById("setsNumber") as HTMLInputElement;


formElement.addEventListener("submit", (event) => {
	event.preventDefault();

	if (!name_input.value) {
		alert("Must enter a name!");
		return;
	} else if (exerciseCounter == 0) {
		alert("Must create at least one exercise!");
		return;
	}

	final_obj['name'] = name_input.value;
	if (rest_input.value != "") final_obj['restTime'] = parseInt(rest_input.value);
	final_obj['sets'] = parseInt(sets_input.value);

	const names: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("exercise-name") as HTMLCollectionOf<HTMLInputElement>;
	const types: HTMLCollectionOf<HTMLSelectElement> = document.getElementsByClassName("exercise-type") as HTMLCollectionOf<HTMLSelectElement>;
	const typeNumbers: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("exercise-type-number") as HTMLCollectionOf<HTMLInputElement>;
	const imageURLs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName("exercise-image-input") as HTMLCollectionOf<HTMLInputElement>;

	final_obj['exercises'] = {};
	for (let e = 0; e < exerciseCounter; e++) {
		let currentName = (e + 1) + '. ' + names[e].value;
		let currentType = types[e].options[types[e].selectedIndex].text;
		let currentTypeNumber = parseInt(typeNumbers[e].value);
		let currentImage = imageURLs[e].value;

		final_obj['exercises'][currentName] = {};
		final_obj['exercises'][currentName][currentType] = currentTypeNumber;
		final_obj['exercises'][currentName]['image'] = currentImage;
	}
	PopUp.popup(`<p>Generated JSON:</p><pre>${JSON.stringify(final_obj, null, "\t")}</pre>`);
});




// Code to help add exercises field to the form


function addField() {
	// Generate a dynamic number of inputs
	// Get the element where the inputs will be added to
	let container = document.getElementById("exercises-container");
	
	if (exerciseCounter != 0) container.appendChild(document.createElement("hr"));

	container.appendChild(document.createTextNode("Exercise " + (++exerciseCounter)));
	container.appendChild(document.createElement("br"));
	
	let input = document.createElement("input");
	input.type = "text";
	input.name = "exercise-name";
	input.classList.add("exercise-name");

	let label = document.createElement("label");
	label.setAttribute("for", 'exercise-name');
	label.innerHTML = "Name";
	container.appendChild(label);

	let select = document.createElement("select");
	select.classList.add("exercise-type");
	let options = [
		document.createElement("option"),
		document.createElement("option")
	];
	options[0].text = "seconds";
	options[1].text = "reps";
	
	for (const option of options) { select.appendChild(option) }

	let secsInput = document.createElement("input");
	secsInput.classList.add("exercise-type-number");
	secsInput.type = "number";
	secsInput.name = "secsInput";
	secsInput.min = "1";
	secsInput.value = "1";

	
	let imageInput = document.createElement("input");
	imageInput.classList.add("exercise-image-input");
	imageInput.type = "text";
	imageInput.name = "imageInput";
	imageInput.placeholder = "Leave it blank for no image...";
	
	let label2 = document.createElement("label");
	label2.setAttribute("for", 'imageInput');
	label2.innerHTML = "Image URL";
	
	
	container.appendChild(input);
	container.appendChild(document.createElement("br"));
	container.appendChild(select);
	container.appendChild(secsInput);
	container.appendChild(document.createElement("br"));
	container.appendChild(label2);
	container.appendChild(imageInput);
	container.appendChild(document.createElement("br"));
}


document.getElementById("exercise-submit").addEventListener("click", addField);
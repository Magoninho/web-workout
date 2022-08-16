import PopUp from "./popUp.js";
import Workout from "./workout.js";
let textarea = document.getElementById("pasted-json");
let fileInput = document.getElementById('file-upload');
let workoutfile = fileInput.files[0];
let workoutText = "";
fileInput.addEventListener("change", handleFiles, false);
const reader = new FileReader();
function handleFiles() {
    const fileList = this.files;
    reader.onload = (evt) => {
        workoutText = String(evt.target.result);
    };
    reader.readAsText(fileList[0]);
}
function makeButtonInactive(btn) {
    btn.disabled = true;
    btn.classList.add("inactive");
    btn.textContent = "Loading...";
}
function makeAllButtonsInactive() {
    let elements = document.getElementsByTagName("button");
    for (const e of elements) {
        makeButtonInactive(e);
    }
}
function closePopUps() {
    PopUp.closePopUps();
}
let btn1 = document.querySelector("#start-btn1");
btn1.onclick = () => {
    PopUp.closePopUps();
    start(textarea.value);
};
let btn2 = document.querySelector("#start-btn2");
btn2.onclick = () => {
    PopUp.closePopUps();
    start(workoutText);
};
function start(text) {
    try {
        let workout = new Workout(JSON.parse(text));
        makeAllButtonsInactive();
        workout.start();
    }
    catch (e) {
        alert("JSON error:\n" + e);
    }
}
document.querySelector("#btn-json-paste").addEventListener("click", () => {
    PopUp.popupDiv(document.querySelector("#json-paste"));
});
document.querySelector("#btn-browse-files").addEventListener("click", () => {
    PopUp.popupDiv(document.querySelector("#browse-files"));
});
//# sourceMappingURL=index.js.map
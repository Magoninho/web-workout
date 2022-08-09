export default class Progress {
    constructor(maxValue, div) {
        this.value = 0;
        this.p = document.createElement("p");
        this.dots = "";
        this.maxValue = maxValue;
        this.div = div;
        this.div.classList.add("progress-div");
        this.p.innerText = this.getPercentage();
        this.p.classList.add("progress-p");
        this.div.appendChild(this.p);
    }
    addProgress(text) {
        if (this.value < this.maxValue) {
            this.value++;
            if (this.dots === "...")
                this.dots = "";
            this.dots += ".";
            this.render(text);
        }
    }
    getPercentage() {
        return `${Math.floor((this.value / this.maxValue) * 100)}%`;
    }
    render(text) {
        this.p.innerText = `${text + this.dots}\n${this.getPercentage()}`;
    }
    removeProgressPopUp() {
        this.div.parentNode.removeChild(this.div);
    }
}
//# sourceMappingURL=progress.js.map
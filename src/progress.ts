export default class Progress {
	public maxValue: number;
	public value: number = 0;

	private div: HTMLDivElement;
	private p: HTMLParagraphElement = document.createElement("p");
	private dots: string = "";

	constructor(maxValue: number, div: HTMLDivElement) {
		this.maxValue = maxValue;
		this.div = div;
		this.div.classList.add("progress-div");
		this.p.innerText = this.getPercentage();
		this.p.classList.add("progress-p");
		this.div.appendChild(this.p);

	}

	public addProgress(text: string) {
		if (this.value < this.maxValue) {
			this.value++;
			if (this.dots === "...") this.dots = "";
			this.dots += ".";
			this.render(text);
		}
	}

	public getPercentage(): string {
		return `${Math.floor((this.value / this.maxValue) * 100)}%`;
	}

	public render(text: string) {
		
		this.p.innerText = `${text + this.dots}\n${this.getPercentage()}`;
	}

	public removeProgressPopUp() {
		this.div.parentNode.removeChild(this.div);

	}
}
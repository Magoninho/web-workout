export default class PopUp {
	/**
	 * Creates a pop up with a message
	 * @param message 
	 */
	 public static popup(message?: any) {
		let modal = document.createElement("div");
		modal.classList.add("modal");

		let modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");
		modal.appendChild(modalContent);

		let closeSpan = document.createElement("span");
		closeSpan.classList.add("close");
		closeSpan.innerHTML = "&times;";
		modalContent.appendChild(closeSpan);

		let p = document.createElement("p");
		p.style.color = "black";
		p.innerHTML = message;
		modalContent.appendChild(p);

		modal.style.display = "block";
		modal.style.textAlign = "center";

		closeSpan.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

		document.body.appendChild(modal);
	}

	public static popupDiv(div: HTMLDivElement) {
		let modal = document.createElement("div");
		modal.classList.add("modal");

		let modalContent = div;
		modalContent.classList.add("modal-content");
		modal.appendChild(modalContent);

		let closeSpan = document.createElement("span");
		closeSpan.classList.add("close");
		closeSpan.innerHTML = "&times;";
		closeSpan.style.position = "absolute";
		closeSpan.style.top = "0px";
		closeSpan.style.right = "10px";
		modalContent.appendChild(closeSpan);

		modal.style.display = "block";
		modal.style.textAlign = "center";

		closeSpan.onclick = function () {
			modal.style.display = "none";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

		document.body.appendChild(modal);
	}

	public static closePopUps() {
		let allPopUps: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("modal") as HTMLCollectionOf<HTMLDivElement>;

		for (const popup of allPopUps) {
			popup.style.display = "none";
		}
	}
}
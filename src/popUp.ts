export default class PopUp {
	/**
	 * Creates a pop up with a message
	 * @param message 
	 */
	public static popup(message?: any) {

		// these lines makes the body not scroll, to prevent bugs in mobile
		document.body.style.height = "100%";
		document.body.style.overflowY = "hidden";


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
			document.body.style.height = "";
			document.body.style.overflowY = "visible";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
				document.body.style.height = "";
				document.body.style.overflowY = "visible";
			}
		}

		document.body.appendChild(modal);
	}

	public static popupDiv(div: HTMLDivElement) {

		// these lines makes the body not scroll, to prevent bugs in mobile
		document.body.style.height = "100%";
		document.body.style.overflowY = "hidden";

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

			// these lines makes the body come back to normal, scrolling again
			document.body.style.height = "";
			document.body.style.overflowY = "visible";
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
				document.body.style.height = "";
				document.body.style.overflowY = "visible";
			}
		}

		document.body.appendChild(modal);
	}

	public static closePopUps() {
		document.body.style.height = "";
		document.body.style.overflowY = "visible";
		let allPopUps: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("modal") as HTMLCollectionOf<HTMLDivElement>;

		for (const popup of allPopUps) {
			popup.style.display = "none";
		}
	}
}
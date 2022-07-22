const canvas = document.getElementById("icon_canvas");
let context;

function init() {
	context.fillStyle = "rgb(240, 240, 240)";
	context.fillRect(0, 0, 420, 420);
}

function generate(generateString) {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		crypto.subtle.digest("SHA-1", reader.result).then((resolve) => {
			const hashString = [].map.call(new Uint8Array(resolve), x => ("00" + x.toString(16)).slice(-2)).join("");
			const colorArray = Array.from(hashString.slice(-7));
			context.fillStyle = "hsl(" + (Math.round(parseInt(colorArray.slice(0, 3).join(""), 16) * (360 / 4095))) + ", " + (65 - Math.round(parseInt(colorArray.slice(3, 5).join(""), 16) * (20 / 255))) + "%, " + (75 - Math.round(parseInt(colorArray.slice(5, 7).join(""), 16) * (20 / 255))) + "%)";
			const dotArray = Array.from(hashString.slice(0, 15));
			dotArray.forEach((dotChar, index) => {
				if(parseInt(dotChar, 16) % 2 == 0) {
					if(index >= 5) context.fillRect(Math.floor(index / 5) * -70 + 175, index % 5 * 70 + 35, 70, 70);
					context.fillRect(Math.floor(index / 5) * 70 + 175, index % 5 * 70 + 35, 70, 70);
				}
			});
		});
	}, {once: true});
	reader.readAsArrayBuffer(new Blob([generateString]));
}

function generateButton() {
	init()
	generate(document.getElementById("generate_key_string").value);
}

if(canvas.getContext) {
	context = canvas.getContext("2d");
	init();
}
else {
	document.getElementById("generator_area").classList.add("hidden");
	document.getElementById("canvas_unavailable_message").classList.remove("hidden");
}
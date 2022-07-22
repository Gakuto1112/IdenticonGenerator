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
			const hash = [].map.call(new Uint8Array(resolve), x => ("00" + x.toString(16)).slice(-2)).join("");
			console.log(hash);
		});
	}, {once: true});
	reader.readAsArrayBuffer(new Blob([generateString]));
}

function generateButton() {
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
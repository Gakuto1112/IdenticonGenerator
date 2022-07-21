const canvas = document.getElementById("icon_canvas");
let context;
function init() {
	context.fillStyle = "rgb(240, 240, 240)";
	context.fillRect(0, 0, 420, 420);
}

if(canvas.getContext) {
	context = canvas.getContext("2d");
	init();
}
else {
	document.getElementById("generator_area").classList.add("hidden");
	document.getElementById("canvas_unavailable_message").classList.remove("hidden");
}
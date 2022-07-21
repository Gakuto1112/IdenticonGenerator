const canvas = document.getElementById("icon_canvas");
if(canvas.getContext) {

}
else {
	document.getElementById("generator_area").classList.add("hidden");
	document.getElementById("canvas_unavailable_message").classList.remove("hidden")
}
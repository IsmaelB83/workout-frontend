// Material Select Initialization
$(document).ready(function() {
	$('.mdb-select').material_select();
});

// Drag and Drop Events
function allowDrop(ev) {
  /* The default handling is to not allow dropping elements. */
  /* Here we allow it by preventing the default behaviour. */
  ev.preventDefault();
  /* Over effect on the droppable area*/
  $("#caja-ejercicios").addClass("caja-ejercicios-dragover");
}

function drag(ev) {
  /* Here is specified what should be dragged. */
  /* This data will be dropped at the place where the mouse button is released */
  /* Here, we want to drag the element itself, so we set it's ID. */
  ev.dataTransfer.setData("text/html", ev.target.id);
}

function dragleave(ev) {
    $("#caja-ejercicios").removeClass("caja-ejercicios-dragover");
}

function drop(ev) {
	/* If you use DOM manipulation functions, their default behaviour it not to 
	   copy but to alter and move elements. By appending a ".cloneNode(true)", 
	   you will not move the original element, but create a copy. */
    ev.preventDefault();
  	var div_target = document.getElementById("caja-ejercicios");
    var id = ev.dataTransfer.getData("text/html");
    var original = document.getElementById(id);
	/* Con CTRL se copia, si no se mueve */
  	if (ev.ctrlKey) {
    	var clone = original.cloneNode(true);
    	clone.id = "rut_" + id;
		div_target.appendChild(clone);
	} else {
		div_target.appendChild(original);
	}

    
    $("#caja-instrucciones").addClass("d-none");
    $("#caja-ejercicios").removeClass("caja-ejercicios-dragover");
}

// Material Select Initialization
$(document).ready(function() {
	$('.mdb-select').material_select();
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/******************************
/*     Drag and Drop Events   *
/******************************/
function allowDrop(ev) {
  /* The default handling is to not allow dropping elements. */
  /* Here we allow it by preventing the default behaviour. */
  ev.preventDefault();
  /* Over effect on the droppable area*/
  $("#caja-ejercicios").addClass("caja-ejercicios-dragover");
}

function drag(ev) {
  /* Here is specified what should be dragged. */
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
  /* Obtengo datos de la caja de ejercicios */ 
  var div_target = document.getElementById("caja-ejercicios");
  var exer_count = div_target.getElementsByClassName("exer_card").length + 1;
  /* Obtengo el ejercicio que se esta moviendo */ 
  var exer = document.getElementById(ev.dataTransfer.getData("text/html"));
  /* Distingo si se esta moviendo un ejercicio o añadiendo uno nuevo */
  if (ev.dataTransfer.getData("text/html").startsWith("ejer_search")) {
    /* Obtengo datos del ejercicio que se esta moviendo */ 
    var exer_image = exer.getElementsByClassName("card-image")[0].style.backgroundImage;
    var exer_muscle = exer.getElementsByClassName("result-muscle")[0].innerHTML;
    var exer_title = exer.getElementsByTagName("h6")[0].innerHTML;
    exer.remove();
    /* Clono el card dummy, lo configuro (id, imagen, titulo, ...) y lo añado a la caja */
    var card_clone = document.getElementById("exer_card_clone").cloneNode(true);
    card_clone.classList.remove("d-none");
    card_clone.id = "exer_" + exer_count;
    card_clone.getElementsByClassName("card-image")[0].style.backgroundImage = exer_image;
    card_clone.getElementsByTagName("h6")[0].innerHTML = exer_muscle;
    card_clone.getElementsByTagName("h4")[0].innerHTML = exer_title;
    card_clone.getElementsByClassName("exer_card_edit")[0].addEventListener("click", editEjerWorkout);
    card_clone.getElementsByClassName("exer_card_trash")[0].addEventListener("click", deleteEjerWorkout);
    div_target.appendChild(card_clone);
    /* Oculto las instrucciones, y quito la clase "over" de la caja de ejercicios */
    $("#caja-instrucciones").addClass("d-none");
    $("#caja-ejercicios").removeClass("caja-ejercicios-dragover");
  } else {
    div_target.appendChild(exer);
  }
}

/************************************
/*  Listado de ejercicios busqueda  *
/************************************/
var buttons = document.querySelectorAll(".ejer_search_btn");
for (var i=0;i<buttons.length;i++) {
  buttons[i].addEventListener("click", addEjerWorkout);
}  

function addEjerWorkout () {
 /* Obtengo datos de la caja de ejercicios */ 
 var div_target = document.getElementById("caja-ejercicios");
 var exer_count = div_target.getElementsByClassName("exer_card").length + 1;
 /* Obtengo datos del ejercicio copiado */ 
 var exer = document.getElementById(this.parentNode.parentNode.parentNode.parentNode.parentNode.id);
 var exer_image = exer.getElementsByClassName("card-image")[0].style.backgroundImage;
 var exer_muscle = exer.getElementsByClassName("result-muscle")[0].innerHTML;
 var exer_title = exer.getElementsByTagName("h6")[0].innerHTML;
 exer.remove();
 /* Clono el card dummy, lo configuro (id, imagen, titulo, ...) y lo añado a la caja */
 var card_clone = document.getElementById("exer_card_clone").cloneNode(true);
 card_clone.classList.remove("d-none");
 card_clone.id = "exer_" + exer_count;
 card_clone.getElementsByClassName("card-image")[0].style.backgroundImage = exer_image;
 card_clone.getElementsByTagName("h6")[0].innerHTML = exer_muscle;
 card_clone.getElementsByTagName("h4")[0].innerHTML = exer_title;
 card_clone.getElementsByClassName("exer_card_edit")[0].addEventListener("click", editEjerWorkout);
 card_clone.getElementsByClassName("exer_card_trash")[0].addEventListener("click", deleteEjerWorkout);
 div_target.appendChild(card_clone);
 /* Oculto las instrucciones, y quito la clase "over" de la caja de ejercicios */
 $("#caja-instrucciones").addClass("d-none");
 $("#caja-ejercicios").removeClass("caja-ejercicios-dragover");
}

/********************************
 *  Panel ejercicios en rutina  *
 ********************************/
var ejercicio_editado = "";

function editEjerWorkout () {
  var ejer = this.parentNode.parentNode.parentNode.parentNode;
  ejercicio_editado = ejer.id;
  ejer_imagen = ejer.getElementsByClassName("card-image")[0].style.backgroundImage;
  ejer_muscle = ejer.getElementsByTagName("h6")[0].innerHTML;
  ejer_ejerci = ejer.getElementsByTagName("h4")[0].innerHTML; 
  document.getElementById("modal_ej_imagen").style.backgroundImage = ejer_imagen;
  document.getElementById("modal_ej_muscle").innerHTML = "<small>" + ejer_muscle + "</small>";
  document.getElementById("modal_ej_ejerci").innerHTML = "<strong>" + ejer_ejerci + "</strong>";
}

function deleteEjerWorkout () {
  this.parentNode.parentNode.parentNode.parentNode.remove();
}

/********************
 *  Modal de Sets
 ********************/
document.getElementById("sets_n").addEventListener("change", changeSets);
document.getElementById("aceptar_modal").addEventListener("click", aceptarModal);

function changeSets() {
  if (this.value >= 1 && this.value <= 10) {
    var div_sets = document.getElementById("modal_sets");
    var set_rows = div_sets.getElementsByClassName("sets_row");
    if (this.value < set_rows.length) {
      for (var i = set_rows.length; i > this.value; i--)
        set_rows[i-1].remove();
    } else if (this.value > set_rows.length) {
      for (var i = set_rows.length; i < this.value; i++) {
        var set_clone = set_rows[0].cloneNode(true);
        div_sets.append(set_clone);
      }
    }
  }
}

function aceptarModal() {
  var ejer_card = document.getElementById(ejercicio_editado);
  var div_series = ejer_card.getElementsByClassName("exer_card_series")[0];
  var p = div_series.getElementsByTagName("p"); 
  var length = p.length
  var i = 1;
  while (i < length) {
    p[1].remove();
    i++;
  }
  var n_sets = document.getElementById("sets_n").value;
  var modal_peso = document.getElementById("modal_peso").options[document.getElementById("modal_peso").selectedIndex].text;
  var modal_reps = document.getElementById("modal_reps").options[document.getElementById("modal_reps").selectedIndex].text;
  var modal_series = document.getElementById("modal_sets").getElementsByClassName("sets_row");
  for (var i = 0; i<modal_series.length; i++ ) {
    var inputs = modal_series[i].getElementsByTagName("input");
    var texto = inputs[0].value + " x " + inputs[1].value + " " + modal_peso + " x " + inputs[2].value + "\"";
    if (i===0) {
      p[0].innerHTML = "<small>" + texto + "<small>";
    }
    else {
      var p_new = p[0].cloneNode(true);
      p_new.innerHTML = "<small>" + texto + "<small>";
      div_series.append(p_new);
    }
  }
}
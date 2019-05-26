
var spanNuevo = document.getElementById("spanNuevo");
var nombre  = document.getElementById('nombre');
var ruc = document.getElementById('ruc');
var tipo  = document.getElementById('tipo');
var direccion = document.getElementById('direccion');
var telefono = document.getElementById('telefono');
var email  = document.getElementById('email');
var fecing = document.getElementById('fecing');
var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');
var spanLimpia = document.getElementById('spanLimpia');
var btnEdi = document.querySelector(".btnEdi");

window.onload = function () 
{
	// desactivado(true);
}


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }
// btnEdi.onclick = function() { ponerColor('#ffffff'); }

function ponerColor(color) 
{
	nombre.style.backgroundColor = color;
	ruc.style.backgroundColor = color;
	tipo.style.backgroundColor = color;
	direccion.style.backgroundColor = color;
	telefono.style.backgroundColor = color;
	email.style.backgroundColor = color;
	fecing.style.backgroundColor = color;
}

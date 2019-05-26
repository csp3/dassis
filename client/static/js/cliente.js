
var spanNuevo = document.getElementById("spanNuevo");
var divNuevo = document.getElementById("divNuevo");
var nombre = document.getElementById('nombre');
var apepat = document.getElementById('apepat');
var apemat = document.getElementById('apemat');
var dniruc = document.getElementById('dniruc');
var fecing = document.getElementById('fecing');
var direccion = document.getElementById('direccion');
var telefono = document.getElementById('telefono');
var email = document.getElementById('email');
var nacion = document.getElementById('nacion');
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var btnEdi = document.querySelector(".btnEdi");

window.onload = function () 
{
	dniruc.min = 0;
	dniruc.max = 99999999999;
}


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }
// btnEdi.onclick = function() { ponerColor('#ffffff'); }

function ponerColor(color) 
{
	nombre.style.backgroundColor = color;
	apepat.style.backgroundColor = color;
	apemat.style.backgroundColor = color;
	dniruc.style.backgroundColor = color;
	fecing.style.backgroundColor = color;
	direccion.style.backgroundColor = color;
	telefono.style.backgroundColor = color;
	email.style.backgroundColor = color;
	nacion.style.backgroundColor = color;
}

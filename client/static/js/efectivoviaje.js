
var spanNuevo = document.getElementById("spanNuevo");
var divAF = document.getElementById("divAF");
var subtotal = document.getElementById("tipo");
var total = document.getElementById("fecha");
var monto = document.getElementById("monto");
var vercarro = document.getElementById("vercarro");
var verempleado = document.getElementById("verempleado");
var btnEdi = document.getElementsByClassName('btnEdi');
var btnAgregar = document.getElementById('btnAgregar');
var btnAA = document.getElementsByTagName('button');

//
var choices = [];

window.onload = function () 
{
	  monto.step = 0.01;
	  vercarro.options[0].selected = true;
	  vercarro.options[0].disabled = true;
	  verempleado.options[0].selected = true;
	  verempleado.options[0].disabled = true;
	  tipo.options[0].selected = true;
	  tipo.options[0].disabled = true;
	  pintar("rgb(246,246,246)");
}

spanNuevo.onclick  = function () { pintar("rgb(255, 255, 255)"); }

spanLimpia.onclick = function () { pintar("rgb(246, 246, 246)"); }

btnAgregar.onclick = function () { pintar("rgb(246, 246, 246)"); }

function pintar(color)
{
	verempleado.style.backgroundColor = color;
	vercarro.style.backgroundColor = color;
	fecha.style.backgroundColor = color;
	monto.style.backgroundColor = color;
	tipo.style.backgroundColor = color;
}
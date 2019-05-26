
var spanNuevo = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var nombre = document.getElementById('nombre');

window.onload = function () 
{
	desactivado(true);
}

spanNuevo.onclick = function () 
{
	desactivado(false);
	nombre.focus();
}

function desactivado(boo) 
{
	nombre.disabled = boo;
	btnAgregar.disabled = boo;
}

spanLimpia.onclick = function()
{
	limpia();
	desactivado(true);
}

function limpia()
{
	nombre.value = "";
}
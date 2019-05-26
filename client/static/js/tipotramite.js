
var spanNuevo = document.getElementById("spanNuevo");
var divNuevo = document.getElementById("divNuevo");
var descripcion = document.getElementById('descripcion');
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');

window.onload = function () 
{
	desactivado(true);
}

spanNuevo.onclick = function () 
{
	desactivado(false);
	descripcion.focus();
}

function desactivado(boo) 
{
	descripcion.disabled = boo;
	btnAgregar.disabled = boo;
}

spanLimpia.onclick = function()
{
	limpia();
	desactivado(true);
}

function limpia()
{
	descripcion.value = "";
}

var clientes = document.getElementById('clientes');
var proveedores = document.getElementById('proveedores'); 
// var documentos = document.getElementById('documentos'); 
// var tramites = document.getElementById('tramites');
var carros = document.getElementById('carros');
var empleados = document.getElementById('empleados');
var lugares = document.getElementById('lugares');
var facturas = document.getElementById('facturas');
// var efectivoviaje = document.getElementById('efectivoviaje');
var efacturador = document.getElementById('efacturador');
var eemisor = document.getElementById('eemisor');
var ecorreo = document.getElementById('ecorreo');
var repuestos = document.getElementById('repuestos');

clientes.onclick = function () { enlace("clientes"); }

proveedores.onclick = function () { enlace("proveedores"); }

// documentos.onclick = function () { enlace("documentos"); }

// tramites.onclick = function () { enlace("tramites"); }

carros.onclick = function () { enlace("carros"); }

// empleados.onclick = function() { enlace("empleados"); }

viajes.onclick = function () { enlace("viajes"); }

gastos.onclick = function () { enlace("gastos"); }

lugares.onclick = function () { enlace("lugares"); }

facturas.onclick = function () { enlace("facturas"); }

// efectivoviaje.onclick = function () { enlace("efectivoviajes"); }

repuestos.onclick = function () { enlace("repuestos"); }

// function enlace(url) { window.open("#/"+url, "_blank"); }

efacturador.onclick = function () {
	window.open("http://facturador.facturactiva.com", "_blank");
}

eemisor.onclick = function () {
	window.open("http://emisores.facturactiva.com", "_blank");
}

ecorreo.onclick = function () {
	window.open("", "_blank");
}

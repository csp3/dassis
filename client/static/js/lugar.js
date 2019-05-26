
var spanNuevo = document.getElementById("spanNuevo");
var divNuevo = document.getElementById("divNuevo");
var distrito = document.getElementById('distrito');
var provincia = document.getElementById('provincia');
var departamento = document.getElementById('departamento');
var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');
var spanLimpia = document.getElementById('spanLimpia');
var btnEdi = document.querySelector(".btnEdi");


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }
// btnEdi.onclick = function() { ponerColor('#ffffff'); }

function ponerColor(color) 
{
	departamento.style.backgroundColor = color;
	provincia.style.backgroundColor = color;
	distrito.style.backgroundColor = color;
}

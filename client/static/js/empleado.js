
var spanNuevo = document.getElementById("spanNuevo");
var spanLimpia = document.getElementById("spanLimpia");
var divNuevo = document.getElementById("divNuevo");
var nombre = document.getElementById('nombre');
var apepat = document.getElementById('apepat');
var apemat = document.getElementById('apemat');
var dniruc = document.getElementById('dniruc');
var fecing = document.getElementById('fecing');
var feclicencia = document.getElementById('feclicencia');
var paga = document.getElementById('paga');
var cargo = document.getElementById('cargo');
var direccion = document.getElementById('direccion');
var telefono = document.getElementById('telefono');
var email = document.getElementById('email');
var nacion = document.getElementById('nacion');
var btnEdi = document.getElementsByClassName('btnEdi');
var btnAgregar = document.getElementById('btnAgregar');
var btnAA = document.getElementsByTagName('button');
var inpbuscar = document.getElementById('inpbuscar');
var btnEdi = document.querySelector(".btnEdi");

window.onload = function ()
{
	dniruc.min = 0;
	dniruc.max = 99999999999;
	paga.min = 0;
	paga.step = 0.01;

	let numfilas = tabladat.rows.length;
	// LICENCIA
	alerta(numfilas, 5);
}

function alerta(numfilas, columna) 
{
	for (let i = 0; i < numfilas; i++) 
	{
		let aux = tabladat.rows[i].cells[columna].innerHTML.split('-'); 
		let fec = new Date(aux[2]+'/'+aux[1]+'/'+aux[0]); 
		
		if(fec.toString() !== 'Invalid Date')
		{
			let f = new Date();
			if(((fec.getTime() - f.getTime())/(1000*60*60*24)) <= 21 ) 
			{
				tabladat.rows[i].cells[columna].style.backgroundColor = 'rgb(255, 145, 145)';
			}
		}
	}
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
	feclicencia.style.background = color;
	paga.style.backgroundColor = color;
	cargo.style.backgroundColor = color;
	direccion .style.backgroundColor = color;
	telefono.style.backgroundColor = color;
	email.style.backgroundColor = color;
	nacion.style.backgroundColor = color;
}

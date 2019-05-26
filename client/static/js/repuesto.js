
var spanNuevo  = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');
var spanLimpia = document.getElementById('spanLimpia');
var inpbuscar  = document.getElementById('inpbuscar');
var verempleado= document.getElementById('verempleado');
var vercarro = document.getElementById('vercarro');
var codigo = document.getElementById('codigo');
var descripcion = document.getElementById('descripcion');
var fecingreso = document.getElementById('fecingreso');
var imagen = document.getElementById('imagen');
var imagen2 = document.getElementById('imagen2');
var importe = document.getElementById('importe');
var tabladat = document.getElementById('tabladat');
var fechaini = document.getElementById('fechaini');
var fechafin = document.getElementById('fechafin');
var consultarfecha = document.getElementById('consultarfecha');
var buscarcarro   = document.getElementById('buscarcarro');
var consultarcarro = document.getElementById('consultarcarro');
var exportarexcel = document.getElementById('exportarexcel');
var contedata = document.getElementById("contedata");
var btnEdi = document.querySelector(".btnEdi");
var choices = [];
var arrayfec = [];
var arraycli = [];
var arraycar = [];

window.onload = function () 
{
	//iniciaroptions();
	fechafin.value = fechaini.value = fechahoy();
	ponerselect();
	importe.step = 0.01;
	for (let i=0; i<vercarro.length; i++ ) 
	{
		choices.push(vercarro[i].innerHTML);
	}
}

function ponerselect ()
{
	vercarro.options[0].selected = true;
	vercarro.options[0].disabled = true;
	verempleado.options[0].selected = true;
	verempleado.options[0].disabled = true;
}

var demo = new autoComplete({
	selector: 'input[name="q"]',
	minChars: 1,
	source: function(term, suggest){
		term = term.toLowerCase();
		
		var suggestions = [];
		for (let i=0;i<choices.length;i++)
			if (~choices[i].toLowerCase().indexOf(term)) 
				suggestions.push(choices[i]);
			suggest(suggestions);
	}
});

consultarfecha.onclick = function ()
{
	arrayfec = [];
	let fi = fechaini.value.trim().split('-');
	let ff = fechafin.value.trim().split('-');
	let fini = new Date(fi[2]+'/'+fi[1]+'/'+fi[0]);
	let ffin = new Date(ff[2]+'/'+ff[1]+'/'+ff[0]);
	
	if (fechaini.value.trim().length != 10 && fechafin.value.trim().length != 10 && fechavalida(fechaini) && fechavalida(fechafin))
	{
		alert("Fecha no valida..");
	}
	else 
	{
		for (let i = 0; i < tabladat.rows.length; i++) 
		{
			let aux = tabladat.rows[i].cells[5].innerHTML.split('-');
			let fec = new Date(aux[2]+'/'+aux[1]+'/'+aux[0]);
			if( fini <= fec && fec <= ffin) arrayfec.push(i); // guardar indice fecha
		}

		// escogiendo en tabla, ocultando los negados
		for (let i = 0; i < tabladat.rows.length; i++) 
		{
			tabladat.rows[i].style.display = 'none';
			for (let j = 0; j < arrayfec.length; j++) if(arrayfec[j]==i)  tabladat.rows[i].style.display = 'table-row';
		}
	}
}

consultarcarro.onclick = function ()
{
	arraycar = [];
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		if(tabladat.rows[i].cells[2].innerHTML.search(buscarplaca.value.toUpperCase().trim()) > -1)
		{
			arraycar.push(i);
		}
	}

	// escogiendo en tabla, ocultando los negados
	for (let i = 0; i < tabladat.rows.length; i++)
	{
		tabladat.rows[i].style.display = 'none';
		for (let j = 0; j < arraycar.length; j++)  if(arraycar[j]==i) tabladat.rows[i].style.display = 'table-row';
	}
}

exportarexcel.onclick = function ()
{
	exportTableToExcel("contedata");
}


function exportTableToExcel(tableID, filename = ''){
	var downloadLink;
	var dataType = 'application/vnd.ms-excel';
	var tableSelect = document.getElementById(tableID);
	var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
	
	// Specify file name
	filename = filename?filename+'.xls':'excel_viajes.xls';
	
	// Create download link element
	downloadLink = document.createElement("a");
	
	document.body.appendChild(downloadLink);
	
	if(navigator.msSaveOrOpenBlob){
		 var blob = new Blob(['\ufeff', tableHTML], {
			  type: dataType
		 });
		 navigator.msSaveOrOpenBlob( blob, filename);
	}else{
		 // Create a link to the file
		 downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
	
		 // Setting the file name
		 downloadLink.download = filename;
		 
		 //triggering the function
		 downloadLink.click();
	}
}

function fechahoy () 
{
	let hoy = new Date();
	let d = hoy.getDate().toString();
	let m = (hoy.getMonth() + 1).toString();
	let a = hoy.getFullYear().toString();
	
	if(d.length == 1)	d = '0'+d;
	if(m.length == 1) m = '0'+m;
	
   return d+'-'+m+'-'+a;
}

function fechavalida(fecha) {
	if ( Object.prototype.toString.call(fecha) === "[object Date]" )
		return true;
	else 
		return false;
}

function iniciaroptions ()
{
	verempleado.options[0].selected = true;
	verempleado.options[0].disabled = true;
	vercarro.options[0].selected = true;
	vercarro.options[0].disabled = true;
}


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }
// btnEdi.onclick = function() { ponerColor('#ffffff'); }

function ponerColor(color) 
{
	vercarro.style.backgroundColor = color;
	verempleado.style.backgroundColor = color;
	codigo.style.backgroundColor = color;
	fecingreso.style.backgroundColor = color;
	descripcion.style.backgroundColor = color;
	importe.style.backgroundColor = color;
	imagen3.style.backgroundColor = color;
}

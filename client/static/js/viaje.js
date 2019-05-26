
var spanNuevo  = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var inpbuscar  = document.getElementById('inpbuscar');
var verempleado= document.getElementById('verempleado');
var verlugar = document.getElementById('verlugar');
var verlugarp = document.getElementById('verlugarp');
var vercarro = document.getElementById('vercarro');
var vercliente = document.getElementById('vercliente');
var vercliented = document.getElementById('vercliented');
var grt = document.getElementById('grt');
var fecsalida  = document.getElementById('fecsalida');
var fecrecibido = document.getElementById('fecrecibido');
var consultarfecha = document.getElementById('consultarfecha');
var consultarcli   = document.getElementById('consultarcli');
var consultarcarro = document.getElementById('consultarcarro');
var consultargrt = document.getElementById('consultargrt');
var tabladat = document.getElementById('tabladat');
var fechaini = document.getElementById('fechaini');
var fechafin = document.getElementById('fechafin');
var buscarcliente = document.getElementById('buscarcliente');
var buscarplaca   = document.getElementById('buscarplaca');
var buscargrt = document.getElementById('buscargrt');
var exportarexcel = document.getElementById('exportarexcel');
var contedata = document.getElementById("contedata");
var detalle = document.getElementById("detalle");
var verfactura = document.getElementById("verfactura");

var choices = [];
var arrayfec = [];
var arraycli = [];
var arraycar = [];
var arraygrt = [];

window.onload = function () 
{
	fechafin.value = fechaini.value = fechahoy();

	for (let i=0; i<vercliente.length; i++ ) 
	{
		choices.push(vercliente[i].innerHTML);
	}
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
			let aux = tabladat.rows[i].cells[8].innerHTML.split('-');
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
		if(tabladat.rows[i].cells[3].innerHTML.search(buscarplaca.value.toUpperCase().trim()) > -1)
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

consultarcli.onclick = function ()
{
	arraycli = [];
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		if(tabladat.rows[i].cells[1].innerHTML.search(buscarcliente.value.toUpperCase().trim()) > -1)
		{
			arraycli.push(i);
		}
	}

	// escogiendo en tabla, ocultando los negados
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		tabladat.rows[i].style.display = 'none';
		for (let j = 0; j < arraycli.length; j++)  if(arraycli[j]==i) tabladat.rows[i].style.display = 'table-row';
	}
}

consultargrt.onclick = function ()
{
	arraygrt = [];
	for(let i=0; i<tabladat.rows.length; i++)
	{
		if(tabladat.rows[i].cells[5].innerHTML.search(buscargrt.value.toUpperCase().trim()) > -1)
		{
			arraygrt.push(i);
		}
	}

	// escogiendo en tabla
	for(let i=0; i<tabladat.rows.length; i++)
	{
		tabladat.rows[i].style.display = 'none';
		for(let j=0; j<arraygrt.length; j++) if(arraygrt[j]==i) tabladat.rows[i].style.display = 'table-row';
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
	filename = filename?filename+'.xls':'excel_guias.xls';
	
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

function fechavalida(fecha) 
{
	if ( Object.prototype.toString.call(fecha) === "[object Date]" )
		return true;
	else 
		return false;
}


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }

function ponerColor(color) 
{
	verempleado.style.backgroundColor = color;
	vercliente.style.backgroundColor = color;
	verlugar.style.backgroundColor = color;
	vercarro.style.backgroundColor = color;
	fecsalida.style.backgroundColor = color;
	fecrecibido.style.backgroundColor = color;
	grt.style.backgroundColor = color;
	detalle.style.backgroundColor = color;
	vercliented.style.backgroundColor = color;
	verlugarp.style.backgroundColor = color;
	verfactura.style.backgroundColor = color;
}

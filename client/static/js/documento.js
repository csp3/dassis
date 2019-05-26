
var spanNuevo = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var tipoclipro = document.getElementById("tipoclipro");
var clienom = document.getElementById('clienom');
// var provnom = document.getElementById('provnom');
var tipodoc = document.getElementById('tipodoc');
var nro = document.getElementById('nro');
var feccrea = document.getElementById('feccrea');
var pagoTotal = document.getElementById('pagoTotal');
var contenido = document.getElementById('contenido');
var feccan = document.getElementById('feccan');
var consultarfecha = document.getElementById('consultarfecha');
var consultarcli   = document.getElementById('consultarcli');
var tabladat = document.getElementById('tabladat');
var fechaini = document.getElementById('fechaini');
var fechafin = document.getElementById('fechafin');
var buscarcliente = document.getElementById('buscarcliente');
var exportarexcel = document.getElementById('exportarexcel');
arraycli = [];
arrayfec = [];

window.onload = function () 
{
	clienom.options[0].selected = true;
	clienom.options[0].disabled = true;

	fechafin.value = fechaini.value = fechahoy();

	pagoTotal.step = 0.01;
}

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
			let aux = tabladat.rows[i].cells[2].innerHTML.split('-'); 
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

consultarcli.onclick = function ()
{
	arraycli = [];
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		if(tabladat.rows[i].cells[3].innerHTML.search(buscarcliente.value.toUpperCase().trim()) > -1)
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

exportarexcel.onclick = function ()
{
	exportTableToExcel("tabladat");
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
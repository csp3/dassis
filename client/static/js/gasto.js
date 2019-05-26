 
var spanNuevo = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var btnActualizar = document.getElementById('btnActualizar');
var spanLimpia = document.getElementById('spanLimpia');
var inpbuscar = document.getElementById('inpbuscar');
var verproveedor = document.getElementById('verproveedor');
var vercarro = document.getElementById('vercarro');
var detalle = document.getElementById('detalle');
var importe = document.getElementById('importe');
var factura = document.getElementById('factura');
var fecha = document.getElementById('fecha');
var consultarfecha = document.getElementById('consultarfecha');
var consultarprov  = document.getElementById('consultarprov');
var consultarcarro = document.getElementById('consultarcarro');
var tabladat = document.getElementById('tabladat');
var fechaini = document.getElementById('fechaini');
var fechafin = document.getElementById('fechafin');
var buscarcarro = document.getElementById('buscarcarro');
var buscarproveedor = document.getElementById('buscarproveedor');
var exportarexcel = document.getElementById('exportarexcel');
var contedata = document.getElementById("contedata");
var btnEdi = document.querySelector(".btnEdi");
var choices = [];
var arrayfec = [];
var arrayprov = [];
var arraycarro = []; 

window.onload = function () 
{
	importe.step = 0.01;
	fechafin.value = fechaini.value = fechahoy();
}

function pintar(color)
{
	verproveedor.style.backgroundColor = color;
	vercarro.style.backgroundColor = color;
	factura.style.backgroundColor = color;
	detalle.style.backgroundColor = color;
	importe.style.backgroundColor = color;
	fecha.style.backgroundColor = color;
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
			let aux = tabladat.rows[i].cells[4].innerHTML.split('-'); 
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

consultarprov.onclick = function () 
{
	arrayprov = [];
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		if(tabladat.rows[i].cells[2].innerHTML.search(buscarproveedor.value.toUpperCase().trim()) > -1)
		{
			arrayprov.push(i);
		}
	}

	// escogiendo en tabla, ocultando los negados
	for (let i = 0; i < tabladat.rows.length; i++) 
	{
		tabladat.rows[i].style.display = 'none';
		for (let j = 0; j < arrayprov.length; j++)  if(arrayprov[j]==i) tabladat.rows[i].style.display = 'table-row';
	}
}

consultarcarro.onclick = function()
{
	arraycarro = [];
	for(let i=0; i<tabladat.rows.length; i++)
	{
		if(tabladat.rows[i].cells[5].innerHTML.search(buscarcarro.value.toUpperCase().trim()) > -1)
		{
			arraycarro.push(i);
		}
	}

	// escogiendo en tabla, y ocultando lo buscado
	for(let i=0; i < tabladat.rows.length; i++)
	{
		tabladat.rows[i].style.display = 'none';
		for (let j=0; j<arraycarro.length; j++) if(arraycarro[j]==i) tabladat.rows[i].style.display = 'table-row';
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


exportarexcel.onclick = function (e)
{
	exportTableToExcel("contedata");
}

function exportTableToExcel(tableID, filename = ''){
	var downloadLink;
	var dataType = 'application/vnd.ms-excel';
	var tableSelect = document.getElementById(tableID);
	var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
	
	// Specify file name
	filename = filename?filename+'.xls':'excel_gastos.xls';
	
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


spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }
// btnEdi.onclick = function() { ponerColor('#ffffff'); }

function ponerColor(color) 
{
	verproveedor.style.backgroundColor = color;
	vercarro.style.backgroundColor = color;
	detalle.style.backgroundColor = color;
	importe.style.backgroundColor = color;
	factura.style.backgroundColor = color;
	fecha.style.backgroundColor = color;
}

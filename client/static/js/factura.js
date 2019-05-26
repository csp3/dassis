
var spanAF = document.getElementById("spanAF");
var divAF = document.getElementById("divAF");
var vercliente = document.getElementById("vercliente");
var total = document.getElementById("total");
var nro = document.getElementById("nro");
var fecha = document.getElementById("fecha");
var guias = document.getElementById("guias");
var feccancela = document.getElementById("feccancela");
// var btnEdi = document.getElementsByClassName('btnEdi');
var btnAgregar = document.getElementById('btnAgregar');
var btnEdi = document.querySelector(".btnEdi");
var btnActualizar = document.getElementById('btnActualizar');
var btnAA = document.getElementsByTagName('button');
var inpbuscar = document.getElementById("inpbuscar");
var exportarexcel = document.getElementById('exportarexcel');
var contedata = document.getElementById("contedata");
var tabladat = document.getElementById("tabladat");
var divform = document.getElementById("divform");
var formg = document.getElementById("formg");
var spanNuevo = document.getElementById('spanNuevo');
var spanLimpia = document.getElementById('spanLimpia');
var choices = [];
var arrayg = [];

window.onload = function () 
{
	// total.step = '0.01';

	for (let i=0; i<vercliente.length; i++ ) {
		choices.push(vercliente[i].innerHTML);
	}

}

function rellena(n)
{
	// var auxi = ""+n;
	// var res = 6 - auxi.length;
	// if(res==1) return "0" + n;
	// if(res==2) return "00" + n;
	// if(res==3) return "000" + n;
	// if(res==4) return "0000" + n;
	// if(res==5) return "00000" + n;
}

function obtener(o)
{
	// arrayg = [];
	
	// // var guiav = tabladat.rows[o.rowIndex].cells[5].innerHTML.split("GRT//")[1];
	// var guiav = tabladat.rows[o.parentNode.rowIndex].cells[5].innerHTML.split("GRT//")[1];
	// var seriev = serie = '';
	// if (guiav == null) 
	// {
	// 	alert("No GRT");
	// }
	// else
	// {
	// 	seriev = guiav.split(",");
	// 	for(let i=0; i<seriev.length; i++)
	// 	{
	// 		serievg = seriev[i].split("-");
	// 		serie = serievg[0];
			
	// 		for (let j=1; j<serievg.length; j++)
	// 		{
	// 			arrayg.push("00" + parseInt(serie) + "-" + rellena(parseInt(serievg[j])));				
	// 		}
	// 	}
		
	// 	// console.log(arrayg);
	// 	divform.style.width = "250px";
	// 	divform.style.height = "250px";
	// 	if(document.getElementById("midiv") !== null)
	// 	{
	// 		formg.removeChild(formg.childNodes[1]);
	// 	}
	// 	var div = document.createElement("div");
	// 	div.id = "midiv";
	// 	div.style.position = "absolute";
	// 	div.style.width = "90%";
	// 	div.style.fontSize = "12px";
	// 	div.style.paddingLeft = "5px";
	// 	for(let i=0; i<arrayg.length; i++)
	// 	{
	// 		// div.innerHTML += "<br><label v-on:click='ponerGrt('"+arrayg[i]+"')' >"+arrayg[i]+"</label><br>";
	// 		div.innerHTML += '<button type="submit" id="btnVerGuia" v-on:click="ponerGrt('+"004-002657"+')"> ' + arrayg[i] + '</button>';
	// 	}
		
	// 	var divclose = document.createElement("div");
	// 	divclose.innerHTML = "<a>CERRAR</a>";
	// 	divclose.style.marginTop = "3px";
	// 	divclose.style.padding = "5px 0";
	// 	divclose.style.position = "relative";
	// 	divclose.style.borderTop = "1px solid #9ec74e";
	// 	divclose.style.borderBottom = "1px solid #9ec74e";
	// 	divclose.style.textAlign = "center";
	// 	divclose.style.cursor = "pointer";
	// 	divclose.onclick = function(){
	// 		formg.removeChild(div);
	// 		divform.style.width = "0px";
	//       divform.style.height = "0px";
	// 	}
	// 	div.appendChild(divclose);
	// 	formg.appendChild(div);
	// }
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
	filename = filename?filename+'.xls':'excel_facturas.xls';
	
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

spanNuevo.onclick = function() {	ponerColor('#ffffff'); }
spanLimpia.onclick = function() { ponerColor('#b2b2b2'); }
btnAgregar.onclick = function() { ponerColor('#b2b2b2'); }
//btnActualizar.onclick = function() { ponerColor('#b2b2b2'); }

function ponerColor(color) 
{
	nro.style.backgroundColor = color;
	fecha.style.backgroundColor = color;
	total.style.backgroundColor = color;
	guias.style.backgroundColor = color;
	feccancela.style.backgroundColor = color;
	vercliente.style.backgroundColor = color;
}
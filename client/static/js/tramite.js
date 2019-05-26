
var spanNuevo = document.getElementById("spanNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var nro = document.getElementById("nro");
var verdocumento = document.getElementById('verdocumento');
var empnom = document.getElementById('empnom');
var tipotramite = document.getElementById('tipotramite');
var inpbuscar = document.getElementById('inpbuscar');
var choices = [];

window.onload = function () 
{
	nro.options[0].selected = true;
	verdocumento.options[0].selected = true;
	empnom.options[0].selected = true;
	tipotramite.options[0].selected = true;
	
	nro.options[0].disabled = true;
	verdocumento.options[0].disabled = true;
	empnom.options[0].disabled = true;
	tipotramite.options[0].disabled = true;

	for (let i=0; i<verdocumento.length; i++ ) {
		choices.push(verdocumento[i].innerHTML);
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

// inpbuscar.oninput = function()
// {
// 	nro.selectedIndex = this.value.split('_:ID:')[1];
// }
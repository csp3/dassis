
var constancia = document.getElementById('constancia');
var categoria = document.getElementById('categoria');
var seriechasis = document.getElementById('seriechasis');
var modelo = document.getElementById('modelo');
var placa = document.getElementById('placa');
var marca = document.getElementById('marca');
var ejes = document.getElementById('ejes');
var aniofab = document.getElementById('aniofab');
var carga = document.getElementById('carga');
var motor = document.getElementById('motor');
var soatfec = document.getElementById('soatfec');
var extinfec = document.getElementById('extinfec');
var revtecfec = document.getElementById('revtecfec');
var tabladat = document.getElementById('tabladat'); 
var spanNuevo = document.getElementById("spanNuevo");
var divNuevo = document.getElementById("divNuevo");
var btnAgregar = document.getElementById('btnAgregar');
var spanLimpia = document.getElementById('spanLimpia');
var btnActualizar = document.getElementById('btnActualizar');
var btnEdi = document.querySelector(".btnEdi");

window.onload = function () 
{
   ejes.min = 0;
   ejes.max = 100;

   let numfilas = tabladat.rows.length;

   // SOAT
   alerta(numfilas, 9);
   // REV. TEC.
   alerta(numfilas, 10);
   // EXTINTOR
   alerta(numfilas, 11);
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
         if(((fec.getTime() - f.getTime())/(1000*60*60*24)) <= 14 ) 
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
btnEdi.onclick = function() { ponerColor('#ffffff'); }
 
function ponerColor(color) 
{
   constancia.style.backgroundColor = color;
   categoria.style.backgroundColor = color;
   seriechasis.style.backgroundColor = color;
   modelo.style.backgroundColor = color;
   placa.style.backgroundColor = color;
   marca.style.backgroundColor = color;
   ejes.style.backgroundColor = color;
   aniofab.style.backgroundColor = color;
   carga.style.backgroundColor = color;
   motor.style.backgroundColor = color;
   soatfec.style.backgroundColor = color;
   extinfec.style.backgroundColor = color;
   revtecfec.style.backgroundColor = color;
}
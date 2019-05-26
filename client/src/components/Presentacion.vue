<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/presentacion.css">
      <div class="contenedor-1">
         <!-- <div id="circulo"></div> -->
         <div class="titulo"><img src="static/images/logodas.png"><br> MULTISERVICIOS &nbsp;</div>
         <div id="enlaces">
            <!-- <div id="clientes">CLIENTES</div> -->
            <!-- <div id="proveedores">PROVEEDOR</div> -->
            <!-- <div id="documentos">DOCUMENTO</div> -->
            <!-- <div id="tramites">TRAMITES</div> -->
            <!-- <div id="carros">CARROS</div> -->
            <!-- <div id="empleados">EMPLEADO</div> -->
            <!-- <div id="lugares">LUGARES</div> -->
            <!-- <div id="facturas">FACTURAS</div> -->
            <!-- <div id="gastos">GASTOS</div> -->
            <!-- <div id="viajes">VIAJESxCLIENTE</div> -->
            <!-- <div id="efectivoviaje">EFECTIVOxVIAJE</div> -->
            <!-- <div id="repuestos">REPUESTOS</div> -->
            <router-link to="empleados" target="_blank" id="empleados">PERSONAL</router-link>
            <router-link to="clientes" target="_blank" id="clientes">CLIENTES</router-link>
            <router-link to="proveedores" target="_blank" id="proveedores">PROVEEDOR</router-link>
            <router-link to="carros" target="_blank" id="carros">CARROS</router-link>
            <router-link to="lugares" target="_blank" id="lugares">LUGARES</router-link>
            <router-link to="facturas" target="_blank" id="facturas">FACTURAS</router-link>
            <router-link to="gastos" target="_blank" id="gastos">GASTOS</router-link>
            <router-link to="viajes" target="_blank" id="viajes">GUIAS T.</router-link>
            <router-link to="repuestos" target="_blank" id="repuestos">REPUESTOS</router-link>
            <div id="misenlaces">ENLACES<br>
               <ul>
                  <li id="efacturador">FACTURADOR</li>
                  <li id="eemisor">EMISOR</li>
                  <li id="ecorreo">CORREO</li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  created () {
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/presentacion.js')
    document.head.appendChild(creaScript)
  }
}
</script>
<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/viaje.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;GUIAS T. </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false"> Nuevo + </div>
               <div id="spanLimpia" class="spandiv" @click="limpia()"> Limpia + </div>
               <form v-on:submit.prevent="addNewViaje">
                  <form id="formbus" onsubmit="return false;">
                     <label>Buscar Cliente : </label> <input v-model="inpbuscar" id="inpbuscar" name="q" placeholder="...">
                  </form>
                  <textarea v-model="detalle" name="detalle" id="detalle" placeholder="...detalle" :disabled="activar"></textarea>
                  <select v-model="vercliente"  name="vercliente" id="vercliente" :disabled="activar">
                     <option value="" selected>...Remitente</option>
                     <option v-for="(todo) in todosClientes" v-bind:key="todo.cliente_id" v-bind:value="todo.cliente_id" v-bind:title="todo.cliente_id"> {{ todo.cliente_id + ' > ' + todo.cliente_dniruc + ' > ' + todo.cliente_nombre }} </option>
                  </select>
                  <select v-model="vercliented"  name="vercliented" id="vercliented" :disabled="activar">
                     <option value=""   selected disabled>...Destinatario</option>
                     <option v-for="(todo) in todosClientes" v-bind:key="todo.cliente_id" v-bind:value="todo.cliente_nombre"> {{ todo.cliente_id + ' > ' + todo.cliente_dniruc + ' > ' + todo.cliente_nombre }} </option>
                  </select>
                  <select v-model="verlugarp"  name="verlugarp" id="verlugarp" :disabled="activar">
                     <option value="">...Lugar Partida</option>
                     <option v-for="(todo) in todosLugares" v-bind:key="todo.lugar_id" v-bind:value="todo.lugar_id + '-' + todo.lugar_distrito + '-' + todo.lugar_provincia + '-' + todo.lugar_departamento" v-bind:title="todo.lugar_id" > {{ todo.lugar_id + ' ⮚ ' + todo.lugar_distrito + ' - ' + todo.lugar_provincia + ' - ' + todo.lugar_departamento }} </option>
                  </select>
                  <select v-model="verlugar"  name="verlugar" id="verlugar" :disabled="activar">
                     <option value="">...Lugar LLegada</option>
                     <option v-for="(todo) in todosLugares" v-bind:key="todo.lugar_id" v-bind:value="todo.lugar_id" v-bind:title="todo.lugar_id" > {{ todo.lugar_id + ' ⮚ ' + todo.lugar_distrito + ' - ' + todo.lugar_provincia + ' - ' + todo.lugar_departamento }} </option>
                  </select>
                  <input v-model="grt" type="text" id="grt" placeholder="... GRT" :disabled="activar">
                  <input v-model="fecsalida" type="date" id="fecsalida" title="fecha salida" placeholder="..fec.salida" :disabled="activar">
                  <input v-model="fecrecibido" type="date" id="fecrecibido" title="fecha recibido" placeholder="..fec.recibido" :disabled="activar">
                  <select v-model="vercarro"  name="vercarro" id="vercarro" @change="cambio('vercarro')" :disabled="activar">
                     <option value="">...Carro</option>
                     <option v-for="(todo) in todosCarros" v-bind:key="todo.carro_id" v-bind:value="todo.carro_id" v-bind:title="todo.carro_id" > {{ todo.carro_id + ' ⮚ ' + todo.carro_placa }} </option>
                  </select>
                  <select v-model="verempleado"  name="verempleado" id="verempleado" @change="cambio('verempleado')" :disabled="activar">
                     <option value="">...Empleado</option>
                     <option v-for="(todo) in todosEmpleados" v-bind:key="todo.empleado_id" v-bind:value="todo.empleado_id" v-bind:title="todo.empleado_id" > {{ todo.empleado_id + ' ⮚ ' + todo.empleado_nombre + ' - ' + todo.empleado_apepat + ' - ' + todo.empleado_apemat }} </option>
                  </select>
                  <select v-model="verfactura"  name="verfactura" id="verfactura" :disabled="activar">
                     <option value="">...Facturas</option>
                     <option value="-">-</option>
                     <option v-for="(todo) in todosFacturas" v-bind:key="todo.factura_id" v-bind:value="todo.factura_nro" v-bind:title="todo.factura_nro" > {{ todo.factura_nro }} </option>
                  </select> <br><br>
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> AGREGAR </button>
                  <button v-else v-on:click="updateViaje()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <div class="divconsulta">
               CONSULTAR: &nbsp;&nbsp;&nbsp; Cliente: <input type="text" id="buscarcliente"> <button class="btnconsultar" id="consultarcli">x CLIENTE</button>
               Fec.Inicio: <input id="fechaini"> &nbsp;&nbsp;Fec.Fin: <input id="fechafin"> <button class="btnconsultar" id="consultarfecha">x Fec.SALIDA</button> Guia: <input id="buscargrt"> <button class="btnconsultar" id="consultargrt">x GUIA</button> Placa: <input id="buscarplaca"> <button class="btnconsultar" id="consultarcarro">x CARRO</button>
            </div>
         </div> <br><br><br><br><br><br><br><br><br><br><br>
         <table id="tablatit">
            <tr class="tr1">
               <td>N°:</td>
               <td>REMITENTE</td>
               <td>LUG. PARTIDA</td>
               <td>DESTINATARIO</td>
               <tD>LUG. LLEGADA</td>
               <td>DETALLE</td>
               <td>CARRO</td>
               <td>EMPLEADO</td>
               <td>GUIA</td>
               <td>FACT.</td>
               <td>F.Salida</td>
               <td>F.Recib.</td>
               <td><button id="exportarexcel">EXP. EXCEL</button></td>
            </tr>
         </table>
         <div id="contedata">
            <table id="tablatit2">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>REMITENTE</td>
                  <td>LUG. LLEGADA</td>
                  <td>DESTINATARIO</td>
                  <td>LUG. PARTIDA</td>
                  <td>DETALLE</td>
                  <td>CARRO</td>
                  <td>EMPLEADO</td>
                  <td>GUIA</td>
                  <td>FACT.</td>
                  <td>F.Salida</td>
                  <td>F.Recib.</td>
                  <td><button id="exportarexcel">EXP. EXCEL</button></td>
               </tr>
            </table>
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.viaje_id" v-bind:title="todo.viaje_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.cliente.cliente_id + ' > ' + todo.cliente.cliente_nombre }}</td>
                  <td>{{ todo.lugarp_nombre }}</td>
                  <td>{{ todo.cliented_nombre }}</td>
                  <td>{{ todo.lugare.lugar_distrito + ' - ' + todo.lugare.lugar_provincia + ' - ' + todo.lugare.lugar_departamento }}</td>
                  <td>{{ todo.viaje_detalle }}</td>
                  <td>{{ todo.carro.carro_placa }}</td>
                  <td>{{ todo.empleado.empleado_nombre + ' ' + todo.empleado.empleado_apepat + ' ' + todo.empleado.empleado_apemat }}</td>
                  <td>{{ todo.viaje_grt }}</td>
                  <td>{{ todo.viaje_factura }}</td>
                  <td>{{ todo.viaje_fecsalida2 }}</td>
                  <td>{{ todo.viaje_fecrecibido }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editViaje(todo.viaje_id, todo.carro_id, todo.empleado_id, todo.lugarp_nombre , todo.lugar_id, todo.cliente_id, todo.cliented_nombre, todo.viaje_grt, todo.viaje_factura, todo.viaje_detalle, todo.viaje_fecsalida2, todo.viaje_fecrecibido)" class="btnEdi">Edit</button>
                     <!-- <button v-on:click="ponerFalse()" class="btnEli">Delete</button> -->
                  </td>
               </tr>
            </table>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      todos: [],
      todosEmpleados: [],
      todosClientes: [],
      todosCarros: [],
      todosLugares: [],
      todosFacturas: [],
      id: '',
      inpbuscar: '',
      vercliente: '',
      vercliented: '',
      verempleado: '',
      vercarro: '',
      verfactura: '',
      verlugar: '',
      verlugarp: '',
      fecrecibido: '',
      fecsalida: '',
      grt: '',
      detalle: '',
      guia: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    this.guia = this.$route.params.id
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/viaje.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getViajeG()
    document.getElementById('vercliented').options[0].selected = true
  },
  methods: {
    getViaje () {
      axios.get('/viajes').then(
        result => {
          this.todosCarros = result.data[0]
          this.todosClientes = result.data[1]
          this.todosEmpleados = result.data[2]
          this.todosLugares = result.data[3]
          this.todos = result.data[4]
          // console.log(this.todos)
        },
        error => {
          console.error('--> ' + error.response.data)
        }
      )
    },
    addNewViaje () {
      if (this.vercliente === '' || this.vercliented === '' || this.verempleado === '' || this.vercarro === '' || this.verlugar === '') {
        alert('Debe ingresar: remitente, destinatario, empleado, placa, lugar')
      } else {
        axios.post('/viajes', { carro_id: this.vercarro, empleado_id: this.verempleado, lugarp_nombre: this.verlugarp, lugar_id: this.verlugar, cliente_id: this.vercliente, cliented_nombre: this.vercliented, viaje_grt: this.grt, viaje_factura: this.verfactura, viaje_detalle: this.detalle, viaje_fecsalida2: this.fecsalida, viaje_fecrecibido: this.fecrecibido })
          .then((res) => {
            this.id = ''
            this.vercliente = ''
            this.vercarro = ''
            this.verempleado = ''
            this.verlugar = ''
            this.verlugarp = ''
            this.verfactura = ''
            this.fecsalida = ''
            this.fecrecibido = ''
            this.inpbuscar = ''
            this.grt = ''
            this.detalle = ''
            this.vercliented = ''
            this.activar = 1
            this.getViajeG()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    editViaje (viajeid, carroid, empleadoid, lugarpnombre, lugarid, clienteid, clientednombre, viajegrt, viajefactura, viajedetalle, viajefecsalida2, viajefecrecibido) {
      this.id = viajeid
      this.vercarro = carroid
      this.verempleado = empleadoid
      this.verlugarp = lugarpnombre
      this.verlugar = lugarid
      this.vercliente = clienteid
      this.vercliented = clientednombre
      this.verfactura = viajefactura
      this.grt = viajegrt
      this.detalle = viajedetalle
      this.fecsalida = viajefecsalida2
      this.fecrecibido = viajefecrecibido
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateViaje () {
      if (this.vercliente === '' || this.vercliented === '' || this.verempleado === '' || this.vercarro === '' || this.verlugar === '') {
        alert('Debe ingresar: remitente, destinatario, empleado, placa, lugar')
      } else {
        axios.put(`/viajes/${this.id}`, { carroid: this.vercarro, empleadoid: this.verempleado, lugarp: this.verlugarp, lugarid: this.verlugar, clienteid: this.vercliente, cliented: this.vercliented, grt: this.grt, factura: this.verfactura, detalle: this.detalle, fecsalida2: this.fecsalida, fecrecibido: this.fecrecibido })
          .then((res) => {
            this.id = ''
            this.vercarro = ''
            this.verempleado = ''
            this.verlugar = ''
            this.verlugarp = ''
            this.vercliente = ''
            this.vercliented = ''
            this.verfactura = ''
            this.grt = ''
            this.detalle = ''
            this.fecsalida = ''
            this.fecrecibido = ''
            this.activar = 1
            this.isEdit = false
            this.getViajeG()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    getViajeG () {
      // console.log('guia: ' + this.guia)
      axios.get('/viajes/' + this.guia).then(
        result => {
          this.todosCarros = result.data[0]
          this.todosClientes = result.data[1]
          this.todosEmpleados = result.data[2]
          this.todosLugares = result.data[3]
          this.todos = result.data[4]
          this.todosFacturas = result.data[5]
          // console.log('prueba: ' + this.$route.params)
        },
        error => {
          console.error('--> ' + error.response.data)
        }
      )
    },
    ponerFalse () {
      this.activar = false
      this.isEdit = false
    },
    cambio (x) {
      if (x === 'vercliente') {
        this.nro = this.vercliente
      }
    },
    limpia () {
      this.inpbuscar = ''
      this.vercliente = ''
      this.verlugar = ''
      this.verempleado = ''
      this.vercarro = ''
      this.verfactura = ''
      this.fecsalida = ''
      this.fecrecibido = ''
      this.grt = ''
      this.vercliented = ''
      this.verlugarp = ''
      this.detalle = ''
      this.isEdit = false
      this.activar = 1
    },
    darColor () {
      document.getElementById('verempleado').style.backgroundColor = '#ffffff'
      document.getElementById('vercliente').style.backgroundColor = '#ffffff'
      document.getElementById('verlugar').style.backgroundColor = '#ffffff'
      document.getElementById('vercarro').style.backgroundColor = '#ffffff'
      document.getElementById('fecsalida').style.backgroundColor = '#ffffff'
      document.getElementById('fecrecibido').style.backgroundColor = '#ffffff'
      document.getElementById('grt').style.backgroundColor = '#ffffff'
      document.getElementById('detalle').style.backgroundColor = '#ffffff'
      document.getElementById('vercliented').style.backgroundColor = '#ffffff'
      document.getElementById('verlugarp').style.backgroundColor = '#ffffff'
      document.getElementById('verfactura').style.backgroundColor = '#ffffff'
    }
  }
}
</script>
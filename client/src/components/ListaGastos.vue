<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/gasto.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;GASTOS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false"> Nuevo + </div>
               <div id="spanLimpia" class="spandiv" @click="limpia()"> Limpia + </div>
               <form id="formbus" onsubmit="return false;">
                  <label>Buscar Proveedor : </label> <input v-model="inpbuscar" id="inpbuscar" name="q" placeholder="...">
               </form>
               <form v-on:submit.prevent="addNewGasto">
                  <select v-model="verproveedor"  name="verproveedor" id="verproveedor" @change="cambio('verproveedor')" :disabled="activar">
                     <option value="">...Proveedores</option>
                     <option v-for="(todo) in todosProveedores" v-bind:key="todo.proveedor_id" v-bind:value="todo.proveedor_id" v-bind:title="todo.proveedor_id" > {{ todo.proveedor_id + ' > ' + todo.proveedor_ruc + ' > ' + todo.proveedor_nombre }} </option>
                  </select>
                  <input v-model.trim="factura" type="text" id="factura" placeholder="..factura" :disabled="activar">
                  <select v-model="vercarro"  name="vercarro" id="vercarro" @change="cambio('vercarro')" :disabled="activar">
                     <option value="">...Carros</option>
                     <option v-for="(todo) in todosCarros" v-bind:key="todo.carro_id" v-bind:value="todo.carro_id" v-bind:title="todo.carro_id" > {{ todo.carro_placa }} </option>
                  </select> <br>
                  <input v-model.trim="detalle" type="text" id="detalle" placeholder="...detalle" :disabled="activar">
                  <input v-model.trim="fecha" type="date" id="fecha" placeholder="..fecha" :disabled="activar">
                  <input v-model.trim="importe" type="number" id="importe" placeholder="...importe" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> AGREGAR </button>
                  <button v-else v-on:click="updateGasto()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <div class="divconsulta">
               CONSULTAR: &nbsp;&nbsp;&nbsp; Proveedor: <input type="text" id="buscarproveedor"> <button class="btnconsultar" id="consultarprov">x PROV.</button>
               Fecha Inicio: <input id="fechaini"> &nbsp;&nbsp;Fecha Fin: <input id="fechafin"> <button class="btnconsultar" id="consultarfecha">x FECHA</button> &nbsp;&nbsp;Placa: <input id="buscarcarro"> <button class="btnconsultar" id="consultarcarro">x PLACA</button>
            </div>
         </div>
         <div id="contedata">
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>DETALLE</td>
                  <td>PROVEEDOR</td>
                  <td>IMPORTE</td>
                  <td>FECHA</td>
                  <td>CARRO</td>
                  <td>FACTURA</td>
                  <td><button id="exportarexcel">EXP. EXCEL</button></td>
               </tr>
            </table>
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.gasto_id" v-bind:title="todo.gasto_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.gasto_detalle }}</td>
                  <td>{{ todo.proveedore.proveedor_id + ' > ' + todo.proveedore.proveedor_ruc + ' > ' + todo.proveedore.proveedor_nombre }}</td>
                  <td>{{ todo.gasto_importe }}</td>
                  <td>{{ todo.gasto_fecha2 }}</td>
                  <td>{{ todo.carro.carro_placa }}</td>
                  <td>{{ todo.gasto_factura }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editGasto(todo.gasto_id, todo.proveedore.proveedor_id, todo.carro.carro_id, todo.gasto_detalle, todo.gasto_importe, todo.gasto_factura, todo.gasto_fecha2)" class="btnEdi">Edit</button>
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
      todosProveedores: '',
      todosCarros: '',
      id: '',
      inpbuscar: '',
      detalle: '',
      verproveedor: '',
      vercarro: '',
      importe: '',
      fecha: '',
      factura: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/gasto.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getGasto()
  },
  methods: {
    getGasto () {
      axios.get('/gastos').then(
        result => {
          this.todosProveedores = result.data[0]
          this.todosCarros = result.data[1]
          this.todos = result.data[2]
          // console.log(this.todos)
        },
        error => {
          console.error('--> ' + error.response.data)
        }
      )
    },
    addNewGasto () {
      if (this.verproveedor === '' || this.vercarro === '' || this.importe === '' || this.fecha === '') {
        alert('Debe ingresar: proveedor, placa, importe')
      } else {
        axios.post('/gastos', {proveedor_id: this.verproveedor, carro_id: this.vercarro, gasto_detalle: this.detalle, gasto_importe: this.importe, gasto_factura: this.factura, gasto_fecha2: this.fecha})
          .then((res) => {
            this.id = ''
            this.verproveedor = ''
            this.vercarro = ''
            this.detalle = ''
            this.importe = ''
            this.factura = ''
            this.fecha = ''
            this.inpbuscar = ''
            this.getGasto()
            this.activar = 1
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    editGasto (gastoid, proveedorid, carroid, detalle, importe, factura, fecha2) {
      this.id = gastoid
      this.verproveedor = proveedorid
      this.vercarro = carroid
      this.detalle = detalle
      this.importe = importe
      this.factura = factura
      this.fecha = fecha2
      this.isEdit = true
    },
    updateGasto () {
      if (this.verproveedor === '' || this.vercarro === '' || this.importe === '' || this.fecha === '') {
        alert('Debe ingresar: proveedor, placa, importe')
      } else {
        axios.put(`/gastos/${this.id}`, { proveedorid: this.verproveedor, carroid: this.vercarro, detalle: this.detalle, importe: this.importe, factura: this.factura, fecha2: this.fecha })
          .then((res) => {
            this.verproveedor = ''
            this.vercarro = ''
            this.detalle = ''
            this.importe = ''
            this.factura = ''
            this.fecha = ''
            this.isEdit = false
            this.getGasto()
            this.activar = 1
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    ponerFalse () {
      this.activar = false
      this.isEdit = false
    },
    cambio (x) {
      if (x === 'verdocumento') {
        this.nro = this.verdocumento
      }
      if (x === 'nro') {
        this.verdocumento = this.nro
      }
    },
    limpia () {
      this.activar = 1
      this.inpbuscar = ''
      this.isEdit = false
      this.verproveedor = ''
      this.vercarro = ''
      this.detalle = ''
      this.importe = ''
      this.factura = ''
      this.fecha = ''
    },
    darColor () {
      document.getElementById('verproveedor').style.backgroundColor = '#ffffff'
      document.getElementById('vercarro').style.backgroundColor = '#ffffff'
      document.getElementById('detalle').style.backgroundColor = '#ffffff'
      document.getElementById('importe').style.backgroundColor = '#ffffff'
      document.getElementById('factura').style.backgroundColor = '#ffffff'
      document.getElementById('fecha').style.backgroundColor = '#ffffff'
    }
  }
}
</script>
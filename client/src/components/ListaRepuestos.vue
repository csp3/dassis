<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/repuesto.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;REPUESTOS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false"> Nuevo + </div>
               <div id="spanLimpia" class="spandiv" @click="limpia()"> Limpia + </div>
               <form v-on:submit.prevent="addNewRepuesto">
                  <form id="formbus" onsubmit="return false;">
                     <label>Buscar Placa : </label> <input v-model="inpbuscar" id="inpbuscar" name="q" placeholder="...">
                  </form>
                  <select v-model="vercarro"  name="vercarro" id="vercarro" @change="cambio('vercarro')" :disabled="activar">
                     <option value="">...Carro</option>
                     <option v-for="(todo) in todosCarros" v-bind:key="todo.carro_id" v-bind:value="todo.carro_id" v-bind:title="todo.carro_id" > {{ todo.carro_id + ' ⮚ ' + todo.carro_placa }} </option>
                  </select>
                  <select v-model="verempleado"  name="verempleado" id="verempleado" @change="cambio('verempleado')" :disabled="activar">
                     <option value="">...Empleado</option>
                     <option v-for="(todo) in todosEmpleados" v-bind:key="todo.empleado_id" v-bind:value="todo.empleado_id" v-bind:title="todo.empleado_id" > {{ todo.empleado_id + ' ⮚ ' + todo.empleado_nombre + ' - ' + todo.empleado_apepat + ' - ' + todo.empleado_apemat }} </option>
                  </select>
                  <input v-model="codigo" type="text" id="codigo" placeholder="..codigo" :disabled="activar">
                  <input v-model="fecingreso2" type="date" id="fecingreso" placeholder="..fecha ingreso" :disabled="activar">
                  <textarea v-model="descripcion" name="descripcion" id="descripcion" placeholder="...descripcion" :disabled="activar"></textarea>
                  <input v-model="importe" type="number" id="importe" placeholder="..importe" :disabled="activar">
                  <input type="file" @change="subir" id="imagen" name="imagen" accept="image/png, image/jpeg" :disabled="activar">
                  <input v-model="imagen2" name="imagen2" id="imagen2" type="hidden" :disabled="activar">
                  <input v-model="imagen3" name="imagen3" id="imagen3" :disabled="true">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> AGREGAR </button>
                  <button v-else v-on:click="updateRepuesto()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <div class="divconsulta">
               CONSULTAR: &nbsp;&nbsp;&nbsp; Placa: <input type="text" id="buscarcarro"> <button class="btnconsultar" id="consultarcarro">x PLACA</button>
               Fec.Inicio: <input id="fechaini"> &nbsp;&nbsp;Fec.Fin: <input id="fechafin"> <button class="btnconsultar" id="consultarfecha">x Fec.INGRESO</button>
            </div>
         </div>
         <div id="contedata">
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>CONDUCTOR</td>
                  <td>PLACA</td>
                  <td>CODIGO</td>
                  <td>DESCRIPCION</td>
                  <td>FEC.ING.</td>
                  <td>IMPORTE</td>
                  <td>IMAGEN</td>
                  <td><button id="exportarexcel">EXP. EXCEL</button></td>
               </tr>
            </table>
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.repuesto_id" v-bind:title="todo.repuesto_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.empleado.empleado_nombre + ' ' + todo.empleado.empleado_apepat + ' ' + todo.empleado.empleado_apemat }}</td>
                  <td>{{ todo.carro.carro_placa }}</td>
                  <td>{{ todo.repuesto_codigo }}</td>
                  <td>{{ todo.repuesto_descripcion }}</td>
                  <td>{{ todo.repuesto_fecingreso2 }}</td>
                  <td>{{ todo.repuesto_importe }}</td>
                  <td><img v-bind:src="'/static/images/repuestos/' + `${todo.repuesto_imagen}`" width="100px"/></td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editRepuesto(todo.repuesto_id, todo.empleado.empleado_id, todo.carro.carro_id, todo.repuesto_codigo, todo.repuesto_descripcion, todo.repuesto_fecingreso2, todo.repuesto_importe, todo.repuesto_imagen)" class="btnEdi">Edit</button>
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
      todosCarros: [],
      inpbuscar: '',
      verempleado: '',
      vercarro: '',
      codigo: '',
      descripcion: '',
      fecingreso2: '',
      importe: '',
      imagen2: '',
      imagen3: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/repuesto.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getRepuesto()
  },
  methods: {
    getRepuesto () {
      axios.get('/repuestos').then(
        result => {
          this.todosCarros = result.data[0]
          this.todosEmpleados = result.data[1]
          this.todos = result.data[2]
          // console.log(result.data)
        },
        error => {
          console.error('--> ' + error.response.data)
        }
      )
    },
    addNewRepuesto () {
      if (this.vercarro === '' || this.verempleado === '') {
        alert('Debe ingresar Empleado y Carro')
      } else {
        axios.post('/repuestos', {carro_id: this.vercarro, empleado_id: this.verempleado, repuesto_codigo: this.codigo, repuesto_descripcion: this.descripcion, repuesto_fecingreso2: this.fecingreso2, repuesto_importe: this.importe, repuesto_imagen: this.imagen3})
          .then((res) => {
            this.vercarro = ''
            this.verempleado = ''
            this.codigo = ''
            this.descripcion = ''
            this.fecingreso2 = ''
            this.importe = '0'
            this.imagen2 = ''
            this.imagen3 = ''
            this.activar = 1
            this.getRepuesto()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    editRepuesto (id, empleadoid, carroid, codigo, descripcion, fecingreso2, importe, imagen3) {
      this.id = id
      this.verempleado = empleadoid
      this.vercarro = carroid
      this.codigo = codigo
      this.descripcion = descripcion
      this.fecingreso2 = fecingreso2
      this.importe = importe
      this.imagen3 = imagen3
      this.isEdit = true
    },
    updateRepuesto () {
      if (this.vercarro === '' || this.verempleado === '') {
        alert('Debe ingresar Empleado y Carro')
      } else {
        axios.put(`/repuestos/${this.id}`, { empleadoid: this.verempleado, carroid: this.vercarro, codigo: this.codigo, descripcion: this.descripcion, fecingreso2: this.fecingreso2, importe: this.importe, imagen: this.imagen3 })
          .then((res) => {
            this.verempleado = ''
            this.vercarro = ''
            this.codigo = ''
            this.descripcion = ''
            this.fecingreso2 = ''
            this.importe = ''
            this.imagen2 = ''
            this.imagen3 = ''
            this.isEdit = false
            this.getRepuesto()
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
      this.vercliente = ''
      this.vercarro = ''
      this.fecingreso2 = ''
      this.codigo = ''
      this.descripcion = ''
      this.imagen2 = ''
      this.imagen3 = ''
      this.importe = ''
      this.isEdit = false
      this.activar = 1
    },
    subir (event) {
      this.imagen2 = (event.target.files[0] || event.dataTransfer.files[0])
      this.imagen3 = this.imagen2.name
      // console.log('->' + this.imagen2.name)
    },
    darColor () {
      document.getElementById('verempleado').style.backgroundColor = '#ffffff'
      document.getElementById('vercarro').style.backgroundColor = '#ffffff'
      document.getElementById('fecingreso').style.backgroundColor = '#ffffff'
      document.getElementById('codigo').style.backgroundColor = '#ffffff'
      document.getElementById('descripcion').style.backgroundColor = '#ffffff'
      document.getElementById('imagen3').style.backgroundColor = '#ffffff'
      document.getElementById('importe').style.backgroundColor = '#ffffff'
    }
  }
}
</script>
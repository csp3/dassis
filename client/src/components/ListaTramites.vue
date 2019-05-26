<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/tramite.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;TRAMITES </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse()" @click="activar=false"> Nuevo + </div>
               <div id="spanLimpia" class="spandiv" @click="limpia()"> Limpia + </div>
               <form v-on:submit.prevent="addNewTramite">
                  <form id="formbus" onsubmit="return false;">
                     <label>Buscar Documento : </label> <input v-model="inpbuscar" id="inpbuscar" name="q" placeholder="...">
                  </form>
                  <select v-model="verdocumento"  name="verdocumento" id="verdocumento" @change="cambio('verdocumento')" :disabled="activar">
                     <option value="">...Documentos</option>
                     <option v-for="(todo) in todosDocumentos" v-bind:key="todo.documento_id" v-bind:value="todo.documento_id" v-bind:title="todo.documento_id" >{{ todo.documento_nro +' ⮚ '+ JSON.stringify(todo['cliente']).split('\"')[5] + ' ⮚ ' + JSON.stringify(todo['proveedore']).split('\"')[5] + ' ⮚ ' + JSON.stringify(todo['tipodocumento']).split('\"')[5] }}</option>
                  </select> <br>
                  <select v-model="nro"  name="nro" id="nro" :disabled="activar" @change="cambio('nro')">
                     <option value="">...Nro. Dcto.</option>
                     <option v-for="(todo) in todosDocumentos" v-bind:key="todo.documento_id" v-bind:value="todo.documento_id" v-bind:title="todo.documento_id">{{ todo.documento_nro }}</option>
                  </select>
                  <select v-model="tipotramite"  name="tipotramite" id="tipotramite" :disabled="activar">
                     <option value="">...Tramites</option>
                     <option v-for="(todo) in todosTipotramites" v-bind:key="todo.tipotramite_id" v-bind:value="todo.tipotramite_id" v-bind:title="todo.tipotramite_id">{{ todo.tipotramite_describe }}</option>
                  </select>
                  <select v-model="empnom"  name="empnom" id="empnom" :disabled="activar">
                     <option value="">...Empleados</option>
                     <option v-for="(todo) in todosEmpleados" v-bind:key="todo.empleado_id" v-bind:value="todo.empleado_id" v-bind:title="todo.empleado_id">{{ todo.empleado_nombre + ' ' + todo.empleado_apepat }}  {{ todo.empleado_apemat }}</option>
                  </select>
                  <input v-model="fecsalida" type="text" id="fecsalida" placeholder="..fec.salida" :disabled="activar">
                  <input v-model="fecregreso" type="text" id="fecregreso" placeholder="..fec.regreso" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> AGREGAR </button>
                  <button v-else v-on:click="updateTramite()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NRO.DOC.</td>
                  <td>CLIENTE</td>
                  <td>PROVEEDOR</td>
                  <td>TIPO DOC.</td>
                  <td>FEC.SAL/REG</td>
                  <td>DEPENDIENTE</td>
                  <td>TRAMITE</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.tramite_id" v-bind:title="todo.tramite_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.documento.documento_nro }}</td>
                  <td>{{ todo.documento.cliente.cliente_nombre }}</td>
                  <td>{{ todo.documento.proveedore.proveedor_nombre }}</td>
                  <td>{{ todo.documento.tipodocumento.tipodocumento_nombre }}</td>
                  <td>{{ todo.tramite_fecsalida + ' / ' + todo.tramite_fecregreso }}</td>
                  <td>{{ todo.empleado.empleado_nombre + ' ' + todo.empleado.empleado_apepat + ' ' + todo.empleado.empleado_apemat }}</td>
                  <td>{{ todo.tipotramite.tipotramite_describe }}</td>
                  <td>
                     <button v-on:click="ponerFalse(),editTramite(todo.tramite_id,todo.documento_id,todo.empleado_id, todo.tipotramite_id, todo.tramite_fecsalida,todo.tramite_fecregreso)" class="btnEdi">Edit</button>
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
      todosTipotramites: [],
      todosClientes: [],
      todosProveedores: [],
      todosTipodocumentos: [],
      todosDocumentos: [],
      id: '',
      verdocumento: '',
      tipotramite: '',
      empnom: '',
      fecregreso: '',
      fecsalida: '',
      nro: '',
      inpbuscar: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/tramite.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getTramite()
  },
  methods: {
    getTramite () {
      axios.get('/tramites').then(
        result => {
          // console.log(result.data[3])
          // console.log(result.data[1])
          // console.log(result.data[2])
          // console.log(result.data[0])
          this.todosClientes = result.data[0]
          this.todosProveedores = result.data[1]
          this.todosTipodocumentos = result.data[2]
          this.todosDocumentos = result.data[3]
          this.todosEmpleados = result.data[4]
          this.todosTipotramites = result.data[5]
          this.todos = result.data[6]
          // console.log('-> ' + result.data[3][0].cliente.cliente_nombre)
        },
        error => {
          console.error('--> ' + error.response.data)
        }
      )
    },
    addNewTramite () {
      axios.post('/tramites', {tramite_id: this.id, documento_id: this.verdocumento, empleado_id: this.empnom, tipotramite_id: this.tipotramite, tramite_fecsalida: this.fecsalida, tramite_fecregreso: this.fecregreso})
        .then((res) => {
          this.id = ''
          this.verdocumento = ''
          this.tipotramite = ''
          this.empnom = ''
          this.fecregreso = ''
          this.fecsalida = ''
          this.nro = ''
          this.inpbuscar = ''
          this.getTramite()
          this.activar = 1
        },
        error => {
          console.error(error.response.data)
        })
    },
    editTramite (id, documentoid, empleadoid, tipotramiteid, fecsalida, fecregreso) {
      this.id = id
      this.verdocumento = documentoid
      this.nro = documentoid
      this.empnom = empleadoid
      this.tipotramite = tipotramiteid
      this.fecsalida = fecsalida
      this.fecregreso = fecregreso
      this.isEdit = true
    },
    updateTramite () {
      axios.put(`/tramites/${this.id}`, { documentoid: this.verdocumento, empleadoid: this.empnom, tipotramiteid: this.tipotramite, fecsalida: this.fecsalida, fecregreso: this.fecregreso })
        .then((res) => {
          this.verdocumento = 0
          this.empnom = 0
          this.empnom = 0
          this.fecsalida = ''
          this.fecregreso = ''
          this.isEdit = false
          this.getTramite()
          this.activar = 1
        },
        error => {
          console.error(error.response.data)
        })
    },
    ponerFalse () {
      this.activar = false
      this.isEdit = false
      this.tipotramite = 0
      this.nro = 0
      this.empnom = 0
      this.verdocumento = 0
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
      this.nro = 0
      this.inpbuscar = ''
      this.verdocumento = 0
      this.empnom = 0
      this.nro = 0
      this.tipotramite = 0
      this.isEdit = false
    }
  }
}
</script>
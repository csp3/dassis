<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/documento.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;DOCUMENTOS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse()" @click="activar=false"> Nuevo + </div>
               <div id="spanLimpia" class="spandiv" @click="limpia()"> Limpia + </div>
               <form v-on:submit.prevent="addNewDocumento">
                  <!-- <select v-model="tipoclipro" name="tipoclipro" id="tipoclipro" :disabled="activar">
                     <option value=""></option>
                     <option value="cliente">cliente</option>
                     <option value="proveedor">proveedor</option>
                  </select> -->
                  <select v-model="clienom"  name="clienom" id="clienom" @change="cambio('cliente')" :disabled="activar">
                     <option value="" >...cliente</option>
                     <option v-for="(todo) in todosClientes" v-bind:key="todo.cliente_id" v-bind:value="todo.cliente_id" v-bind:title="todo.cliente_id">{{ todo.cliente_nombre}}</option>
                  </select>
                  <!-- <select v-model="provnom"  name="provnom" id="provnom" @change="cambio('proveedor')" :disabled="activar">
                     <option value="" >...proveedores</option>
                     <option v-for="(todo) in todosProveedores" v-bind:key="todo.proveedor_id" v-bind:value="todo.proveedor_id" v-bind:title="todo.proveedor_id">{{ todo.proveedor_nombre}}</option>
                  </select> -->
                  <select v-model="tipodoc" name="tipodoc" id="tipodoc" :disabled="activar">
                     <option value="" >...tipo doc.</option>
                     <option v-for="(todo) in todosTipodocumentos" v-bind:key="todo.tipodocumento_id" v-bind:value="todo.tipodocumento_id" v-bind:title="todo.tipodocumento_id">{{ todo.tipodocumento_nombre}}</option>
                  </select>
                  <input v-model="nro" type="text" id="nro" placeholder="...nro.documento" :disabled="activar">
                  <input v-model="feccrea" type="text" id="feccrea" placeholder="...fecha" :disabled="activar">
                  <!-- <input v-model="pago" type="text" id="pago" placeholder="...pago" :disabled="activar"> -->
                  <input v-model="pagoTotal" type="number" id="pagoTotal" placeholder="...total" :disabled="activar">
                  <input v-model="feccan" type="text" id="feccan" placeholder="...fecha cancela" :disabled="activar">
                  <textarea v-model="contenido" type="text" id="contenido" placeholder="...contenido" :disabled="activar"></textarea>
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> AGREGAR </button>
                  <button v-else v-on:click="updateDocumento()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div> <br>
            <div class="divconsulta">
               <button id="exportarexcel">EXP. EXCEL</button>
               CONSULTAR: &nbsp;&nbsp;&nbsp; Ciente: <input type="text" id="buscarcliente"> <button class="btnconsultar" id="consultarcli">x CLIENTE</button>
               Fecha Inicio: <input id="fechaini"> &nbsp;&nbsp;Fecha Fin: <input id="fechafin"> <button class="btnconsultar" id="consultarfecha">x FECHA</button>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NRO.DOC.</td>
                  <td>FECHA</td>
                  <td>CLIENTE</td>
                  <td>DOCUMENTO</td>
                  <td>CONTENIDO</td>
                  <td>PAGO / TOTAL </td>
                  <td>FEC.CANC.</td>
                  <td></td>
               </tr>
            </table>
         </div> <br> <br> <br>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="todo in todos" v-bind:key="todo.documento_id" v-bind:title="todo.documento_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.documento_nro }}</td>
                  <td>{{ todo.documento_feccrea }}</td>
                  <td>{{ JSON.stringify(todo['cliente']).split('\"')[5] }}</td>
                  <td>{{ JSON.stringify(todo['tipodocumento']).split('\"')[5] }}</td>
                  <td>{{ todo.documento_contenido }}</td>
                  <td>{{ todo.documento_pago + ' / ' + todo.documento_pagoTotal }}</td>
                  <td>{{ todo.documento_feccan }}</td>
                  <td>
                     <button v-on:click="ponerFalse(),editDocumento(todo.documento_id, todo.documento_tipoclipro, todo.cliente_id, todo.proveedor_id, todo.tipodocumento_id, todo.documento_nro, todo.documento_feccrea, todo.documento_pago, todo.documento_pagoTotal, todo.documento_contenido, todo.documento_feccan)" class="btnEdi">Edit</button>
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
      todosClientes: [],
      todosProveedores: [],
      todosTipodocumentos: [],
      id: '',
      tipoC: 1,
      tipoP: 1,
      tipoclipro: '',
      clienom: '',
      provnom: '',
      tipodoc: 1,
      nro: '',
      feccrea: '',
      pago: 0,
      pagoTotal: '',
      contenido: '',
      feccan: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/documento.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getDocumento()
  },
  methods: {
    getDocumento () {
      axios.get('/documentos').then(
        result => {
          // console.log(result.data[0])
          // console.log(result.data[1])
          // console.log(result.data[2])
          // console.log(result.data[3])
          this.todosClientes = result.data[0]
          this.todosProveedores = result.data[1]
          this.todosTipodocumentos = result.data[2]
          this.todos = result.data[3]
          // console.log('-> ' + result.data[3][0].cliente.cliente_nombre)
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewDocumento () {
      // axios.post('/documentos', { tipodocumento_id: '1', cliente_id: '3', proveedor_id: '1' })
      axios({
        method: 'post',
        url: '/documentos',
        data: {
          tipodocumento_id: this.tipodoc,
          cliente_id: this.tipoC,
          proveedor_id: this.tipoP,
          documento_tipoclipro: this.tipoclipro,
          documento_nro: this.nro,
          documento_feccrea: this.feccrea,
          documento_pago: this.pago,
          documento_pagoTotal: this.pagoTotal,
          documento_contenido: this.contenido,
          documento_feccan: this.feccan
        }
      })
        .then((res) => {
          this.tipoclipro = ''
          this.clienom = ''
          this.provnom = ''
          this.tipodoc = 1
          this.nro = ''
          this.feccrea = ''
          this.pago = 0
          this.pagoTotal = 0
          this.contenido = ''
          this.feccan = ''
          this.getDocumento()
          this.activar = 1
        },
        error => {
          console.log(error.response.data)
        })
    },
    editDocumento (id, tipoclipro, clienteid, proveedorid, tipodocumentoid, nro, feccrea, pago, pagoTotal, contenido, feccan) {
      this.id = id
      this.tipoclipro = tipoclipro
      this.clienom = clienteid
      this.provnom = proveedorid
      this.tipodoc = tipodocumentoid
      this.nro = nro
      this.feccrea = feccrea
      this.pago = pago
      this.pagoTotal = pagoTotal
      this.contenido = contenido
      this.feccan = feccan
      this.isEdit = true
    },
    updateDocumento () {
      axios.put(`/documentos/${this.id}`,
        { tipoclipro: this.tipoclipro, tipoC: this.tipoC, tipoP: this.tipoP, tipodoc: this.tipodoc, nro: this.nro, feccrea: this.feccrea, pago: this.pago, pagoTotal: this.pagoTotal, contenido: this.contenido, feccan: this.feccan })
        .then((res) => {
          this.tipoclipro = ''
          this.clienom = ''
          this.provnom = ''
          this.tipodoc = 1
          this.nro = ''
          this.feccrea = ''
          this.pago = 0
          this.pagoTotal = 0
          this.contenido = ''
          this.feccan = ''
          this.isEdit = false
          this.getDocumento()
          this.activar = 1
          // console.log(res)
        },
        error => {
          console.log(error.response.data)
        })
    },
    ponerFalse () {
      this.activar = false
      this.isEdit = false
    },
    cambio (cp) {
      if (cp === 'cliente') {
        this.tipoC = this.clienom
        this.tipoP = 1
        this.tipoclipro = 'cliente'
        // alert('->' + this.tipoC)
      }
      if (cp === 'proveedor') {
        this.tipoP = this.provnom
        this.tipoC = 1
        this.tipoclipro = 'proveedor'
      }
    },
    limpia () {
      this.isEdit = false
      this.activar = 1
      this.nro = ''
      this.feccrea = ''
      this.pago = ''
      this.pagoTotal = ''
    }
  }
}
</script>
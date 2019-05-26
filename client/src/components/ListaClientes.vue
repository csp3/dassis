<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/cliente.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;CLIENTES </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewCliente">
                  <input v-model="nombre" id="nombre" placeholder=" ...nombre/razon social" :disabled="activar">
                  <input v-model="apepat" id="apepat" placeholder="...ape.paterno" :disabled="activar">
                  <input v-model="apemat" id="apemat" placeholder="...ape.materno" :disabled="activar">
                  <input v-model="dniruc" type="number" id="dniruc" placeholder="...dni/ruc" :disabled="activar">
                  <input v-model="fecing" id="fecing" placeholder="...fec.ingreso" :disabled="activar">
                  <input v-model="direccion" id="direccion" placeholder="...direccion" :disabled="activar">
                  <input v-model="telefono" id="telefono" placeholder="...telefono" :disabled="activar">
                  <input v-model="email" id="email" placeholder="...email" :disabled="activar">
                  <input v-model="nacion" id="nacion" placeholder="...nacion" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> Agregar </button>
                  <button v-else v-on:click="updateCliente()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NOMBRE / RAZ.SOC</td>
                  <td>DNI/RUC</td>
                  <td>FEC.INGRESO</td>
                  <td>DIRECCION</td>
                  <td>TELEFONO</td>
                  <td>EMAIL</td>
                  <td>NACION</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.cliente_id" v-bind:title="todo.cliente_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.cliente_id + ' > ' + todo.cliente_nombre + todo.cliente_apepat + todo.cliente_apemat }}</td>
                  <td>{{ todo.cliente_dniruc }}</td>
                  <td>{{ todo.cliente_fecing }}</td>
                  <td>{{ todo.cliente_direccion }}</td>
                  <td>{{ todo.cliente_telefono }}</td>
                  <td>{{ todo.cliente_email }}</td>
                  <td>{{ todo.cliente_nacion }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editCliente(todo.cliente_id, todo.cliente_nombre, todo.cliente_apepat, todo.cliente_apemat, todo.cliente_dniruc, todo.cliente_fecing, todo.cliente_direccion, todo.cliente_telefono, todo.cliente_email, todo.cliente_nacion)" class="btnEdi">Edit</button>
                     <!-- <button v-on:click="ponerFalse()" class="btnEli">Eliminar</button> -->
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
      nombre: '',
      apepat: '',
      apemat: '',
      dniruc: '',
      fecing: '',
      direccion: '',
      telefono: '',
      email: '',
      nacion: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/cliente.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getClientes()
  },
  methods: {
    getClientes () {
      axios.get('/clientes').then(
        result => {
          // console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewCliente () {
      if (this.nombre === '' || this.dniruc === '') {
        alert('Debe ingresar: nombre, dni/ruc')
      } else {
        axios.post('/clientes', {cliente_nombre: this.nombre, cliente_apepat: this.apepat, cliente_apemat: this.apemat, cliente_dniruc: this.dniruc, cliente_fecing: this.fecing, cliente_direccion: this.direccion, cliente_telefono: this.telefono, cliente_email: this.email, cliente_nacion: this.nacion})
          .then((res) => {
            this.nombre = ''
            this.apepat = ''
            this.apemat = ''
            this.dniruc = ''
            this.direccion = ''
            this.telefono = ''
            this.fecing = ''
            this.email = ''
            this.nacion = ''
            this.activar = 1
            this.getClientes()
          })
      }
    },
    editCliente (id, nombre, apepat, apemat, dniruc, fecing, direccion, telefono, email, nacion) {
      this.id = id
      this.nombre = nombre
      this.apepat = apepat
      this.apemat = apemat
      this.dniruc = dniruc
      this.fecing = fecing
      this.direccion = direccion
      this.telefono = telefono
      this.email = email
      this.nacion = nacion
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateCliente () {
      if (this.nombre === '' || this.dniruc === '') {
        alert('Debe ingresar: nombre, dni/ruc')
      } else {
        axios.put(`/clientes/${this.id}`, { nombre: this.nombre, apepat: this.apepat, apemat: this.apemat, dniruc: this.dniruc, fecing: this.fecing, direccion: this.direccion, telefono: this.telefono, email: this.email, nacion: this.nacion })
          .then((res) => {
            this.nombre = ''
            this.apepat = ''
            this.apemat = ''
            this.dniruc = ''
            this.direccion = ''
            this.telefono = ''
            this.fecing = ''
            this.email = ''
            this.nacion = ''
            this.activar = 1
            this.isEdit = false
            this.getClientes()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    ponerFalse () {
      this.isEdit = false
      this.activar = false
    },
    darColor () {
      document.getElementById('nombre').style.backgroundColor = '#ffffff'
      document.getElementById('apepat').style.backgroundColor = '#ffffff'
      document.getElementById('apemat').style.backgroundColor = '#ffffff'
      document.getElementById('dniruc').style.backgroundColor = '#ffffff'
      document.getElementById('fecing').style.backgroundColor = '#ffffff'
      document.getElementById('direccion').style.backgroundColor = '#ffffff'
      document.getElementById('telefono').style.backgroundColor = '#ffffff'
      document.getElementById('email').style.backgroundColor = '#ffffff'
      document.getElementById('nacion').style.backgroundColor = '#ffffff'
    },
    limpia () {
      this.nombre = ''
      this.apepat = ''
      this.apemat = ''
      this.dniruc = ''
      this.fecing = ''
      this.direccion = ''
      this.telefono = ''
      this.email = ''
      this.nacion = ''
      this.activar = 1
      this.isEdit = false
    }
  }
}
</script>
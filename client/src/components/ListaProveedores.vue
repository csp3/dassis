<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/proveedor.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;PROVEEDORES </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewProveedor">
                  <input v-model="nombre" id="nombre" placeholder="...nombre" :disabled="activar">
                  <input v-model="ruc" id="ruc" placeholder="...ruc" :disabled="activar">
                  <input v-model="tipo" id="tipo" placeholder="...tipo" :disabled="activar">
                  <input v-model="direccion" id="direccion" placeholder="...direccion" :disabled="activar">
                  <input v-model="telefono" id="telefono" placeholder="...telefono" :disabled="activar">
                  <input v-model="email" id="email" placeholder="...email" :disabled="activar">
                  <input v-model="fecing" id="fecing" placeholder="...fecha ingreso" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> Agregar </button>
                  <button v-else v-on:click="updateProveedor()" type="button" class="btnAA" id="btnActualizar" > Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NOMBRE</td>
                  <td>RUC</td>
                  <td>TIPO</td>
                  <td>DIRECCION</td>
                  <td>TELEFONO</td>
                  <td>EMAIL</td>
                  <td>FEC.ING.</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.proveedor_id" v-bind:title="todo.proveedor_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.proveedor_id + ' > ' + todo.proveedor_nombre }}</td>
                  <td>{{ todo.proveedor_ruc }}</td>
                  <td>{{ todo.proveedor_tipo }}</td>
                  <td>{{ todo.proveedor_direccion }}</td>
                  <td>{{ todo.proveedor_telefono }}</td>
                  <td>{{ todo.proveedor_email }}</td>
                  <td>{{ todo.proveedor_fecing }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editProveedor(todo.proveedor_id, todo.proveedor_ruc, todo.proveedor_tipo, todo.proveedor_direccion, todo.proveedor_telefono, todo.proveedor_email, todo.proveedor_fecing)" class="btnEdi">Edit</button>
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
      nombre: '',
      ruc: '',
      tipo: '',
      direccion: '',
      telefono: '',
      email: '',
      fecing: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/proveedor.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getProveedor()
  },
  methods: {
    getProveedor () {
      axios.get('/proveedores').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewProveedor () {
      if (this.nombre === '' || this.ruc === '') {
        alert('Debe ingresar: nombre, dni/ruc')
      } else {
        axios.post('/proveedores', {proveedor_nombre: this.nombre, proveedor_ruc: this.ruc, proveedor_tipo: this.tipo, proveedor_direccion: this.direccion, proveedor_telefono: this.telefono, proveedor_email: this.email, proveedor_fecing: this.fecing})
          .then((res) => {
            this.nombre = ''
            this.ruc = ''
            this.tipo = ''
            this.direccion = ''
            this.telefono = ''
            this.email = ''
            this.fecing = ''
            this.getProveedor()
            this.activar = 1
          })
      }
    },
    editProveedor (id, nombre, ruc, tipo, direccion, telefono, email, fecing) {
      this.id = id
      this.nombre = nombre
      this.ruc = ruc
      this.tipo = tipo
      this.direccion = direccion
      this.telefono = telefono
      this.email = email
      this.fecing = fecing
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateCliente () {
      if (this.nombre === '' || this.ruc === '') {
        alert('Debe ingresar: nombre, dni/ruc')
      } else {
        axios.put(`/proveedores/${this.id}`, { nombre: this.nombre, ruc: this.ruc, tipo: this.tipo, direccion: this.direccion, telefono: this.telefono, fecing: this.fecing, email: this.email })
          .then((res) => {
            this.nombre = ''
            this.ruc = ''
            this.tipo = ''
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
    limpia () {
      this.isEdit = false
      this.activar = 1
      this.nombre = ''
      this.ruc = ''
      this.tipo = ''
      this.direccion = ''
      this.telefono = ''
      this.email = ''
      this.fecing = ''
    },
    darColor () {
      document.getElementById('nombre').style.backgroundColor = '#ffffff'
      document.getElementById('ruc').style.backgroundColor = '#ffffff'
      document.getElementById('tipo').style.backgroundColor = '#ffffff'
      document.getElementById('direccion').style.backgroundColor = '#ffffff'
      document.getElementById('telefono').style.backgroundColor = '#ffffff'
      document.getElementById('direccion').style.backgroundColor = '#ffffff'
      document.getElementById('fecing').style.backgroundColor = '#ffffff'
      document.getElementById('email').style.backgroundColor = '#ffffff'
    }
  }
}
</script>
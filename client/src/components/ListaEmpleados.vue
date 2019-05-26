<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/empleado.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;EMPLEADOS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()"  @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" v-on:click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewEmpleado">
                  <input v-model="nombre" id="nombre" placeholder="...nombre" :disabled="activar">
                  <input v-model="apepat" id="apepat" placeholder="...apellido paterno" :disabled="activar">
                  <input v-model="apemat" id="apemat" placeholder="...apellido materno" :disabled="activar">
                  <input v-model="dniruc" type="number" id="dniruc" placeholder="...dni/ruc" :disabled="activar">
                  <input v-model="fecing" id="fecing" placeholder="...fecha ingreso" :disabled="activar">
                  <input v-model="cargo" id="cargo" placeholder="...cargo" :disabled="activar">
                  <input v-model="feclicencia" id="feclicencia" placeholder="...fec.Licencia" :disabled="activar">
                  <input v-model="paga" type="number" id="paga" placeholder="...paga" :disabled="activar">
                  <input v-model="direccion" id="direccion" placeholder="...direccion" :disabled="activar">
                  <input v-model="telefono" id="telefono" placeholder="...telefono" :disabled="activar">
                  <input v-model="email" id="email" placeholder="...email" :disabled="activar">
                  <input v-model="nacion" id="nacion" placeholder="...nacion" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> Agregar </button>
                  <button v-else v-on:click="updateEmpleado()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NOMBRE</td>
                  <td>DNI</td>
                  <td>FEC.ING. / CARGO / PAGA</td>
                  <td>DIRECCION / TELEFONO</td>
                  <td>FEC. LICENCIA</td>
                  <td>EMAIL</td>
                  <td>NACION</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.empleado_id" v-bind:title="todo.empleado_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.empleado_nombre + ' ' + todo.empleado_apepat + ' ' + todo.empleado_apemat }}</td>
                  <td>{{ todo.empleado_dniruc }}</td>
                  <td>{{ todo.empleado_fecing + ' / ' + todo.empleado_cargo + ' / ' + todo.empleado_paga }}</td>
                  <td>{{ todo.empleado_direccion + ' / ' + todo.empleado_telefono }}</td>
                  <td>{{ todo.empleado_feclicencia }}</td>
                  <td>{{ todo.empleado_email }}</td>
                  <td>{{ todo.empleado_nacion }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editEmpleado(todo.empleado_id, todo.empleado_nombre, todo.empleado_apepat, todo.empleado_apemat, todo.empleado_dniruc, todo.empleado_fecing, todo.empleado_feclicencia, todo.empleado_cargo, todo.empleado_paga, todo.empleado_direccion, todo.empleado_telefono, todo.empleado_email, todo.empleado_nacion)" class="btnEdi">Edit</button>
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
      apepat: '',
      apemat: '',
      dniruc: '',
      fecing: '',
      feclicencia: '',
      cargo: '',
      paga: '',
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
    creaScript.setAttribute('src', '../static/js/empleado.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getEmpleados()
  },
  methods: {
    getEmpleados () {
      axios.get('/empleados').then(
        result => {
          // console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewEmpleado () {
      if (this.apepat === '' || this.nombre === '' || this.dniruc === '') {
        alert('Debe ingresar: nombre, apell. paterno, dni/ruc')
      } else {
        axios.post('/empleados', {empleado_nombre: this.nombre, empleado_apepat: this.apepat, empleado_apemat: this.apemat, empleado_dniruc: this.dniruc, empleado_fecing: this.fecing, empleado_feclicencia: this.feclicencia, empleado_cargo: this.cargo, empleado_paga: this.paga, empleado_direccion: this.direccion, empleado_telefono: this.telefono, empleado_email: this.email, empleado_nacion: this.nacion})
          .then((res) => {
            this.id = ''
            this.vercliente = ''
            this.vercarro = ''
            this.verempleado = ''
            this.verlugar = ''
            this.fecsalida = ''
            this.fecrecibido = ''
            this.inpbuscar = ''
            this.grt = ''
            this.detalle = ''
            this.vercliented = ''
            this.activar = 1
            this.getEmpleados()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    editEmpleado (id, nombre, apepat, apemat, dniruc, fecing, feclicencia, cargo, paga, direccion, telefono, email, nacion) {
      this.id = id
      this.nombre = nombre
      this.apepat = apepat
      this.apemat = apemat
      this.dniruc = dniruc
      this.fecing = fecing
      this.feclicencia = feclicencia
      this.cargo = cargo
      this.paga = paga
      this.direccion = direccion
      this.telefono = telefono
      this.email = email
      this.nacion = nacion
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateEmpleado () {
      if (this.apepat === '' || this.nombre === '' || this.dniruc === '') {
        alert('Debe ingresar: nombre, apell. paterno, dni/ruc')
      } else {
        axios.put(`/empleados/${this.id}`, { nombre: this.nombre, apepat: this.apepat, apemat: this.apemat, dniruc: this.dniruc, fecing: this.fecing, feclicencia: this.feclicencia, cargo: this.cargo, paga: this.paga, direccion: this.direccion, telefono: this.telefono, email: this.email, nacion: this.nacion })
          .then((res) => {
            location.reload()
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
    darColor () {
      document.getElementById('nombre').style.backgroundColor = '#ffffff'
      document.getElementById('apepat').style.backgroundColor = '#ffffff'
      document.getElementById('apemat').style.backgroundColor = '#ffffff'
      document.getElementById('dniruc').style.backgroundColor = '#ffffff'
      document.getElementById('fecing').style.backgroundColor = '#ffffff'
      document.getElementById('feclicencia').style.backgroundColor = '#ffffff'
      document.getElementById('cargo').style.backgroundColor = '#ffffff'
      document.getElementById('paga').style.backgroundColor = '#ffffff'
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
      this.feclicencia = ''
      this.cargo = ''
      this.paga = ''
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
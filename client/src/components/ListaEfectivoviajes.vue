<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/efectivoviaje.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;EFECTIVO x VIAJE </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse()">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewEfectivoviaje">
                  <select v-model="vercarro"  name="vercarro" id="vercarro" @change="cambio('vercarro')" :disabled="activar">
                     <option value="">...Carro</option>
                     <option v-for="(todo) in todosCarros" v-bind:key="todo.carro_id" v-bind:value="todo.carro_id" v-bind:title="todo.carro_id" > {{ todo.carro_id + ' > ' + todo.carro_placa }} </option>
                  </select>
                  <select v-model="verempleado"  name="verempleado" id="verempleado" @change="cambio('verempleado')" :disabled="activar">
                     <option value="">...Empleados</option>
                     <option v-for="(todo) in todosEmpleados" v-bind:key="todo.empleado_id" v-bind:value="todo.empleado_id" v-bind:title="todo.empleado_id" > {{ todo.empleado_id + ' > ' + todo.empleado_nombre + ' ' + todo.empleado_apepat + ' ' + todo.empleado_apemat }} </option>
                  </select>
                  <input v-model="fecha" id="fecha" placeholder="...fecha" :disabled="activar">
                  <input v-model="monto" type="number" id="monto" placeholder=" ...monto" :disabled="activar">
                  <select v-model="tipo" name="tipo" id="tipo"><option value="0">...tipo</option><option value="efectivo">EFECTIVO</option><option value="deposito">DEPOSITO</option></select>
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar"> Agregar </button>
                  <button v-else v-on:click="updateFactura()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>PLACA</td>
                  <td>EMPLEADO</td>
                  <td>FECHA</td>
                  <td>MONTO</td>
                  <td>TIPO</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.efectivoviaje_id" v-bind:title="todo.efectivoviaje_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.efectivoviaje_id }}</td>
                  <td>{{ todo.efectivoviaje_id }}</td>
                  <td>{{ todo.efectivoviaje_fecha }}</td>
                  <td>{{ todo.efectivoviaje_monto }}</td>
                  <td>{{ todo.efectivoviaje_tipo }}</td>
                  <td>
                     <button v-on:click="ponerFalse()" class="btnEdi">Editar</button>
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
      todosCarros: '',
      todosEmpleados: '',
      vercarro: '',
      verempleado: '',
      fecha: '',
      monto: '',
      tipo: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/efectivoviaje.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getEfectivoviajes()
  },
  methods: {
    getEfectivoviajes () {
      axios.get('/efectivoviajes').then(
        result => {
          this.todosCarros = result.data[0]
          this.todosEmpleados = result.data[1]
          this.todos = result.data[2]
          console.log(result.data)
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewEfectivoviaje () {
      axios.post('/efectivoviajes', { carro_id: this.vercarro, empleado_id: this.verempleado, efectivoviaje_fecha: this.fecha, efectivoviaje_monto: this.monto, efectivoviaje_tipo: this.tipo })
        .then((res) => {
          this.verempleado = ''
          this.vercarro = ''
          this.fecha = ''
          this.monto = ''
          this.tipo = ''
          this.getFacturas()
          this.activar = 1
        })
    },
    ponerFalse () {
      this.isEdit = false
      this.activar = false
    },
    limpia () {
      this.activar = true
    }
  }
}
</script>
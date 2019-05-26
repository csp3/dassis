<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/tipotramite.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;TIPO TRAMITES </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse()">Nuevo +</div>
               <div id="spanLimpia" class="spandiv">Limpia +</div>
               <form v-on:submit.prevent="addNewTipotramite">
                  <input v-model="descripcion" id="descripcion" placeholder=" ...descripción">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar"> Agregar </button>
                  <button v-else v-on:click="updateTipotramite()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
               <br><br><br><br>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>DESCRIPCION</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.tipotramite_id" v-bind:title="todo.tipotramite_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.tipotramite_describe }}</td>
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
      descripcion: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/tipotramite.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getClientes()
  },
  methods: {
    getClientes () {
      axios.get('/tipotramites').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    ponerFalse () {
      this.isEdit = false
    }
  }
}
</script>
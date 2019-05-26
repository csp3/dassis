<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/tipodocumento.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;TIPO DOCUMENTOS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse()">Nuevo +</div>
               <div id="spanLimpia" class="spandiv">Limpia +</div>
               <form v-on:submit.prevent="addNewTipodocumento">
                  <input v-model="nombre" id="nombre" placeholder="...nombre">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar"> Agregar </button>
                  <button v-else v-on:click="updateTipodocumento()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NOMBRE</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.tipodocumento_id" v-bind:title="todo.tipodocumento_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.tipodocumento_nombre }}</td>
                  <td>
                     <button v-on:click="ponerFalse()" class="btnEdi">Edit</button>
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
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/tipodocumento.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getTipodocumento()
  },
  methods: {
    getTipodocumento () {
      axios.get('/tipodocumentos').then(
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
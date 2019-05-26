<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/lugar.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;LUGARES </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewLugar">
                  <input v-model="distrito" id="distrito" placeholder=" ...distrito" :disabled="activar">
                  <input v-model="provincia" id="provincia" placeholder="...provincia" :disabled="activar">
                  <input v-model="departamento" id="departamento" placeholder="...departamento" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> Agregar </button>
                  <button v-else v-on:click="updateLugar()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div> <br>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>DISTRITO</td>
                  <td>PROVINCIA</td>
                  <td>DEPARTAMENTO</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.lugar_id" v-bind:title="todo.lugar_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.lugar_distrito }}</td>
                  <td>{{ todo.lugar_provincia }}</td>
                  <td>{{ todo.lugar_departamento }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editLugar(todo.lugar_distrito, todo.lugar_provincia, todo.lugar_departamento)" class="btnEdi">Edit</button>
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
      distrito: '',
      provincia: '',
      departamento: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/lugar.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getLugar()
  },
  methods: {
    getLugar () {
      axios.get('/lugares').then(
        result => {
          // console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewLugar () {
      if (this.distrito === '' || this.provincia === '' || this.departamento === '') {
        alert('Debe ingresar: distrito, provincia, departamento')
      } else {
        axios.post('/lugares', {lugar_distrito: this.distrito, lugar_provincia: this.provincia, lugar_departamento: this.departamento})
          .then((res) => {
            this.distrito = ''
            this.provincia = ''
            this.departamento = ''
            this.activar = 1
            this.getLugar()
          })
      }
    },
    editLugar (id, distrito, provincia, departamento) {
      this.id = id
      this.distrito = distrito
      this.provincia = provincia
      this.departamento = departamento
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateLugar () {
      if (this.distrito === '' || this.provincia === '' || this.departamento === '') {
        alert('Debe ingresar: distrito, provincia, departamento')
      } else {
        axios.put(`/lugares/${this.id}`, { distrito: this.distrito, provincia: this.provincia, departamento: this.departamento })
          .then((res) => {
            this.distrito = ''
            this.provincia = ''
            this.departamento = ''
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
      document.getElementById('distrito').style.backgroundColor = '#ffffff'
      document.getElementById('provincia').style.backgroundColor = '#ffffff'
      document.getElementById('departamento').style.backgroundColor = '#ffffff'
    },
    limpia () {
      this.distrito = ''
      this.provincia = ''
      this.departamento = ''
      this.activar = 1
      this.isEdit = false
    }
  }
}
</script>
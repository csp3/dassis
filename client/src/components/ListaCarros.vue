<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/carro.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;CARROS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewCarro">
                  <input v-model="constancia" id="constancia" placeholder="...nro de constancia" :disabled="activar">
                  <input v-model="seriechasis" id="seriechasis" placeholder="...serie de chasis" :disabled="activar">
                  <input v-model="modelo" id="modelo" placeholder="...modelo" :disabled="activar">
                  <input v-model="categoria" id="categoria" placeholder="...categoria" :disabled="activar">
                  <input v-model="placa" id="placa" placeholder="...placa" :disabled="activar">
                  <input v-model="marca" id="marca" placeholder="...marca" :disabled="activar">
                  <input v-model="ejes" type="number" id="ejes" placeholder="...ejes" :disabled="activar">
                  <input v-model="aniofab" id="aniofab" placeholder="...año fabricacion" :disabled="activar">
                  <input v-model="carga" id="carga" placeholder="...carga" :disabled="activar">
                  <input v-model="motor" id="motor" placeholder="...motor" :disabled="activar">
                  <input v-model="soatfec" id="soatfec" placeholder="...soat fecha" :disabled="activar">
                  <input v-model="revtecfec" id="revtecfec" placeholder="...revision tecnica" :disabled="activar">
                  <input v-model="extinfec" id="extinfec" placeholder="...extintor" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar"> Agregar </button>
                  <button v-else v-on:click="updateCarro()" type="button" class="btnAA" id="btnActualizar" > Actualizar </button>
               </form>
            </div>
            <table id="tablatit">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NRO.CONSTANCIA</td>
                  <td>SERIE.CHASIS</td>
                  <td>CATEGORIA</td>
                  <td>MODELO</td>
                  <td>PLACA / MARCA</td>
                  <td>EJES</td>
                  <td>AÑO.FAB</td>
                  <td>CARGA / MOTOR</td>
                  <td>SOAT FEC.</td>
                  <td>REV.TECNICA</td>
                  <td>EXTINTOR</td>
                  <td></td>
               </tr>
            </table>
         </div>
         <div id="contedata">
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.carro_id" v-bind:title="todo.carro_id">
                  <td>{{ todos.indexOf(todo) + 1 + '.'}}</td>
                  <td>{{ todo.carro_constancia }}</td>
                  <td>{{ todo.carro_seriechasis }}</td>
                  <td>{{ todo.carro_categoria }}</td>
                  <td>{{ todo.carro_modelo }}</td>
                  <td>{{ todo.carro_placa + ' / ' + todo.carro_marca }}</td>
                  <td>{{ todo.carro_ejes }}</td>
                  <td>{{ todo.carro_aniofab }}</td>
                  <td>{{ todo.carro_carga + ' / ' + todo.carro_motor }}</td>
                  <td>{{ todo.carro_soatfec }}</td>
                  <td>{{ todo.carro_revtecfec }}</td>
                  <td>{{ todo.carro_extinfec }}</td>
                  <td>
                     <button v-on:click="ponerFalse(), editCarro(todo.carro_id, todo.carro_constancia, todo.carro_seriechasis, todo.carro_categoria, todo.carro_modelo, todo.carro_placa, todo.carro_marca, todo.carro_ejes, todo.carro_aniofab, todo.carro_carga, todo.carro_soatfec, todo.carro_revtecfec, todo.carro_extinfec)" class="btnEdi">Edit</button>
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
      constancia: '',
      categoria: '',
      seriechasis: '',
      modelo: '',
      placa: '',
      marca: '',
      ejes: '',
      aniofab: '',
      carga: '',
      motor: '',
      soatfec: '',
      extinfec: '',
      revtecfec: '',
      activar: true,
      isEdit: false
    }
  },
  created () {
    var creaScAut = document.createElement('script')
    creaScAut.setAttribute('src', '../static/auto-complete.js')
    document.head.appendChild(creaScAut)
    var creaScript = document.createElement('script')
    creaScript.setAttribute('src', '../static/js/carro.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getCarro()
  },
  methods: {
    getCarro () {
      axios.get('/carros').then(
        result => {
          // console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewCarro () {
      if (this.placa === '') {
        alert('Debe ingresar: placa')
      } else {
        axios.post('/carros', {carro_constancia: this.constancia, carro_seriechasis: this.seriechasis, carro_categoria: this.categoria, carro_modelo: this.modelo, carro_placa: this.placa, carro_marca: this.marca, carro_ejes: this.ejes, carro_aniofab: this.aniofab, carro_carga: this.carga, carro_soatfec: this.soatfec, carro_revtecfec: this.revtecfec, carro_extinfec: this.extinfec})
          .then((res) => {
            this.constancia = ''
            this.seriechasis = ''
            this.categoria = ''
            this.modelo = ''
            this.placa = ''
            this.marca = ''
            this.ejes = ''
            this.aniofab = ''
            this.carga = ''
            this.soatfec = ''
            this.revtecfec = ''
            this.extinfec = ''
            this.activar = 1
            this.getCarro()
          })
      }
    },
    editCarro (id, carroconstancia, carroseriechasis, carrocategoria, carromodelo, carroplaca, carromarca, carroejes, carroaniofab, carrocarga, carrosoatfec, carrorevtecfec, carroextinfec) {
      this.id = id
      this.constancia = carroconstancia
      this.seriechasis = carroseriechasis
      this.categoria = carrocategoria
      this.modelo = carromodelo
      this.placa = carroplaca
      this.marca = carromarca
      this.ejes = carroejes
      this.aniofab = carroaniofab
      this.carga = carrocarga
      this.soatfec = carrosoatfec
      this.revtecfec = carrorevtecfec
      this.extinfec = carroextinfec
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    updateCarro () {
      if (this.placa === '') {
        alert('Debe ingresar: placa')
      } else {
        axios.put(`/carros/${this.id}`, { constancia: this.constancia, seriechasis: this.seriechasis, categoria: this.categoria, modelo: this.modelo, placa: this.placa, marca: this.marca, ejes: this.ejes, aniofab: this.aniofab, carga: this.carga, soatfec: this.soatfec, revtecfec: this.revtecfec, extinfec: this.extinfec })
          .then((res) => {
            location.reload()
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
      this.constancia = ''
      this.seriechasis = ''
      this.categoria = ''
      this.modelo = ''
      this.placa = ''
      this.marca = ''
      this.ejes = ''
      this.aniofab = ''
      this.carga = ''
      this.soatfec = ''
      this.revtecfec = ''
      this.extinfec = ''
      this.activar = 1
      this.isEdit = false
    }
  }
}
</script>
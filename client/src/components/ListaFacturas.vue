import Router from 'vue-router'
<template>
   <div>
      <link rel="stylesheet" type="text/css" href="/static/css/base.css">
      <link rel="stylesheet" type="text/css" href="/static/css/factura.css">
      <link rel="stylesheet" type="text/css" href="/static/auto-complete.css">
      <div>
         <div class="divlogo">
            <img alt="">
         </div>
         <div id="conte">
            <div class="titulo"> LISTA &nbsp;DE &nbsp;FACTURAS </div>
            <div class="divNuevo" id="divNuevo">
               <div id="spanNuevo" class="spandiv" v-on:click="ponerFalse(), limpia()" @click="activar=false">Nuevo +</div>
               <div id="spanLimpia" class="spandiv" @click="limpia()">Limpia +</div>
               <form v-on:submit.prevent="addNewFactura">
                  <form id="formbus" onsubmit="return false;">
                     <label>Buscar Cliente: </label> <input v-model="inpbuscar" id="inpbuscar" name="q" placeholder="...">
                  </form>
                  <select v-model="vercliente"  name="vercliente" id="vercliente" :disabled="activar">
                     <option value="">...Cliente</option>
                     <option v-for="(todo) in todosClientes" v-bind:key="todo.cliente_id" v-bind:value="todo.cliente_id" v-bind:title="todo.cliente_id" > {{ todo.cliente_id + ' > ' + todo.cliente_dniruc + ' > ' + todo.cliente_nombre }} </option>
                  </select>
                  <input v-model="nro" id="nro" placeholder=" ...numero" :disabled="activar">
                  <input v-model="fecha2" type="date" id="fecha" placeholder="...fecha" :disabled="activar">
                  <!-- <select v-model="cancela" id="cancela" placeholder="...cancela" :disabled="activar">
                     <option value="0">...Cancelado</option>
                     <option value="no">NO</option>
                     <option value="si">SI</option>
                  </select> -->
                  <textarea v-model="guias" name="guias" id="guias"  placeholder="...guias/descripcion" :disabled="activar"></textarea>
                  <input v-model="total" type="number" id="total" placeholder="...total" :disabled="activar">
                  <input v-model="feccancela2" type="date" id="feccancela" placeholder="...fec. cancela" :disabled="activar">
                  <button v-if="this.isEdit == false" type="submit" class="btnAA" id="btnAgregar" :disabled="activar"> Agregar </button>
                  <button v-else v-on:click="updateFactura()" type="button" class="btnAA" id="btnActualizar"> Actualizar </button>
               </form>
            </div>
            <div class="divconsulta">
               CONSULTAR: Fec. Inicio: <input id="fechaini"> &nbsp;&nbsp;Fec. Fin: <input id="fechafin"> <button class="btnconsultar" id="consultarfecha">x FECHA</button>
            </div>
            <div id="divguia">
               <button class="cerrarguias" v-on:click="ponerGrt('')"> cerrar </button> <br>
               <ul v-for="elemento of arrayg" v-bind:key="elemento">
                  <li><button type="submit" class="botonviajeg" v-on:click="getViajeG(`${elemento}`)"> {{ elemento }} </button></li>
               </ul>
            </div>
            <!-- <div id="divform">
               <form id="formg">
                  <button type="submit" class="btnAA" id="btnVerGuia" v-on:click="ponerGrt('004-002657'), getViajeG()"> MOSTRAR-GUIA </button>
               </form>
            </div> -->
         </div>
         <table id="tablatit">
            <tr class="tr1">
               <td>N°:</td>
               <td>NUMERO</td>
               <td>CLIENTE</td>
               <td>FECHA</td>
               <td>TOTAL</td>
               <td>GUIAS</td>
               <td>_</td>
               <td>FECHA CANC.</td>
               <td><button id="exportarexcel">EXP. EXCEL</button></td>
            </tr>
         </table>
         <div id="contedata">
            <table id="tablatit2">
               <tr class="tr1">
                  <td>N°:</td>
                  <td>NUMERO</td>
                  <td>CLIENTE</td>
                  <td>FECHA</td>
                  <td>TOTAL</td>
                  <td>GUIAS</td>
                  <td>_</td>
                  <td>FECHA CANC.</td>
                  <td><button id="exportarexcel">EXP. EXCEL</button></td>
               </tr>
            </table>
            <table id="tabladat">
               <tr v-for="(todo) in todos" v-bind:key="todo.factura_id" v-bind:title="todo.factura_id" >
                  <td>{{ todos.indexOf(todo) + 1 + '.' }}</td>
                  <td>{{ todo.factura_nro }}</td>
                  <td>{{ todo.cliente.cliente_id + ' > ' + todo.cliente.cliente_dniruc + ' > ' + todo.cliente.cliente_nombre }}</td>
                  <td>{{ todo.factura_fecha2 }}</td>
                  <td>{{ todo.factura_total }}</td>
                  <td v-on:click='ponerGrt(todo.factura_guias)'>{{ todo.factura_guias }}</td>
                  <td></td>
                  <td>{{ todo.factura_feccancela2 }}</td>
                  <td>
                     <button v-on:click="darColor(), ponerFalse(), editFactura(todo.factura_id, todo.factura_nro, todo.cliente.cliente_id, todo.factura_fecha2, todo.factura_total, todo.factura_guias, todo.factura_feccancela2)" class="btnEdi">Edit</button>
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
      todosClientes: [],
      vercliente: '',
      nro: 'F001-',
      fecha2: '',
      feccancela2: '',
      total: 0.00,
      guias: '',
      guia: '',
      arrayg: '',
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
    creaScript.setAttribute('src', '../static/js/factura.js')
    document.head.appendChild(creaScript)
  },
  mounted () {
    this.getFacturas()
    document.getElementById('total').step = 0.01
  },
  methods: {
    getFacturas () {
      axios.get('/facturas').then(
        result => {
          // console.log(result.data)
          this.todosClientes = result.data[0]
          this.todos = result.data[1]
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewFactura () {
      if (this.vercliente === '' || this.nro === 'F001-' || this.nro === '' || this.fecha === '') {
        alert('Debe ingresar: cliente, nro, fecha, total')
      } else {
        axios.post('/facturas', {cliente_id: this.vercliente, factura_nro: this.nro, factura_fecha2: this.fecha2, factura_total: this.total, factura_guias: this.guias, factura_feccancela2: this.feccancela2})
          .then((res) => {
            this.nro = ''
            this.fecha2 = ''
            this.total = ''
            this.guias = ''
            this.feccancela2 = ''
            this.vercliente = ''
            this.activar = 1
            this.getFacturas()
          },
          error => {
            console.error(error.response.data)
          })
      }
    },
    editFactura (facturaid, facturanro, clienteid, facturafecha2, facturatotal, facturaguias, facturafeccancela2) {
      this.id = facturaid
      this.nro = facturanro
      this.vercliente = clienteid
      this.fecha2 = facturafecha2
      this.total = facturatotal
      this.guias = facturaguias
      this.feccancela2 = facturafeccancela2
      this.isEdit = true
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    rellena (n) {
      var auxi = '' + n
      var res = 6 - auxi.length
      if (res === 1) return '0' + n
      if (res === 2) return '00' + n
      if (res === 3) return '000' + n
      if (res === 4) return '0000' + n
      if (res === 5) return '00000' + n
    },
    ponerGrt (o) {
      var arrayg2 = []
      var guiav = o.split('GRT//')[1]
      var seriev = ''
      var serie = ''
      var serievg = ''
      if (o === '') {
        this.arrayg = []
        return
      }
      if (guiav == null) {
        alert('No tiene GRT')
      } else {
        seriev = guiav.split(',')
        for (let i = 0; i < seriev.length; i++) {
          serievg = seriev[i].split('-')
          serie = serievg[0]
          for (let j = 1; j < serievg.length; j++) {
            var auxi = this.rellena(parseInt(serievg[j]))
            arrayg2.push('00' + parseInt(serie) + '-' + auxi)
          }
        }
      }
      this.arrayg = arrayg2
      // console.log(this.arrayg)
    },
    updateFactura () {
      if (this.vercliente === '' || this.nro === '' || this.fecha2 === '' || this.total === '') {
        alert('Debe ingresar: cliente, nro, fecha, total')
      } else {
        axios.put(`/facturas/${this.id}`, { clienteid: this.vercliente, facturanro: this.nro, facturafecha2: this.fecha2, facturatotal: this.total, facturaguias: this.guias, facturafeccancela2: this.feccancela2 })
          .then((res) => {
            this.nro = ''
            this.fecha2 = ''
            this.total = 0.00
            this.guias = ''
            this.feccancela2 = ''
            this.vercliente = ''
            this.activar = 1
            this.isEdit = false
            this.getFacturas()
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
    getViajeG (guiaB) {
      let routeData = this.$router.push({name: 'ListaViajes', params: { id: guiaB }})
      window.open(routeData.href, '_blank')
    },
    limpia () {
      this.nro = 'F001-'
      this.fecha2 = ''
      this.total = 0.00
      this.guias = ''
      this.feccancela2 = ''
      this.vercliente = ''
      this.isEdit = false
      this.activar = 1
    },
    darColor () {
      document.getElementById('nro').style.backgroundColor = '#ffffff'
      document.getElementById('fecha').style.backgroundColor = '#ffffff'
      document.getElementById('total').style.backgroundColor = '#ffffff'
      document.getElementById('guias').style.backgroundColor = '#ffffff'
      document.getElementById('feccancela').style.backgroundColor = '#ffffff'
      document.getElementById('vercliente').style.backgroundColor = '#ffffff'
    }
  }
}
</script>
import Vue from 'vue'
import Router from 'vue-router'
import Presentacion from '@/components/Presentacion'
import ListaTramites from '@/components/ListaTramites'
import ListaTipotramites from '@/components/ListaTipotramites'
import ListaTipodocumentos from '@/components/ListaTipodocumentos'
import ListaDocumentos from '@/components/ListaDocumentos'
import ListaProveedores from '@/components/ListaProveedores'
import ListaEmpleados from '@/components/ListaEmpleados'
import ListaClientes from '@/components/ListaClientes'
import ListaCarros from '@/components/ListaCarros'
import ListaViajes from '@/components/ListaViajes'
import ListaGastos from '@/components/ListaGastos'
import ListaLugares from '@/components/ListaLugares'
import ListaFacturas from '@/components/ListaFacturas'
import ListaEfectivoviajes from '@/components/ListaEfectivoviajes'
import ListaRepuestos from '@/components/ListaRepuestos'

Vue.use(Router)

export default new Router({
  // routes: [{ path: '/', name: 'HelloWorld', component: HelloWorld }]
  routes: [{path: '/', name: 'Presentacion', component: Presentacion}, {path: '/clientes', name: 'ListaClientes', component: ListaClientes}, {path: '/carros', name: 'ListaCarros', component: ListaCarros}, {path: '/empleados', name: 'ListaEmpleados', component: ListaEmpleados}, {path: '/proveedores', name: 'ListaProveedores', component: ListaProveedores}, {path: '/documentos', name: 'ListaDocumentos', component: ListaDocumentos}, {path: '/tipodocumentos', name: 'ListaTipodocumentos', component: ListaTipodocumentos}, {path: '/tipotramites', name: 'ListaTipotramites', component: ListaTipotramites}, {path: '/tramites', name: 'ListaTramites', component: ListaTramites}, {path: '/viajes', name: 'ListaViajes1', component: ListaViajes}, {path: '/viajes/:id', name: 'ListaViajes', component: ListaViajes}, {path: '/gastos', name: 'ListaGastos', component: ListaGastos}, {path: '/lugares', name: 'ListaLugares', component: ListaLugares}, {path: '/facturas', name: 'ListaFacturas', component: ListaFacturas}, {path: '/efectivoviajes', name: 'ListaEfectivoviajes', component: ListaEfectivoviajes}, {path: '/repuestos', name: 'ListaRepuestos', component: ListaRepuestos}]
})
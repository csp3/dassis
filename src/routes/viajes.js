module.exports = app =>{
	const Carro = app.db.models.carros;
	const Empleado = app.db.models.empleados;
	const Lugar = app.db.models.lugares;
	const Cliente = app.db.models.clientes;
	const Viaje = app.db.models.viajes;
	const Factura = app.db.models.facturas;

	// // get viaje por nro
	app.get('/viajes/:id', (req, res) => {
		var auxguia = JSON.stringify(req.params.id)
		// console.log("<<<<<<<GET CON PARAMETRO " + JSON.stringify(req.params.id))
		if (auxguia === '"undefined"') {
			// console.log("<<<<<<<<<< Parametro undefined => todos ")
			Carro.findAll({ attributes: ['carro_id', 'carro_placa'], where: {carro_estado: 1}, order: [['carro_placa', 'ASC']] })
			.then(
				result1 => Cliente.findAll({ attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc'], where: {cliente_estado: 1}, order:[['cliente_nombre', 'ASC']] })
				.then(
					result2 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'], where: {empleado_estado: 1}, order: [['empleado_nombre', 'ASC']] })
					.then(
						result3 => Lugar.findAll({ attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento'], where: {lugar_estado: 1}, order: [['lugar_distrito', 'ASC']] })
						.then(
							result4 => Viaje.findAll({ attributes: ['viaje_id', 'carro_id', 'empleado_id','lugarp_nombre', 'lugar_id', 'cliente_id', 'cliented_nombre', 'viaje_grt', 'viaje_detalle', 'viaje_fecsalida2', 'viaje_fecrecibido', 'viaje_factura'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Lugar, attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento']}, {model: Carro, attributes: ['carro_id','carro_placa']}, {model: Cliente, attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc']}], order: [['viaje_fecsalida2', 'DESC']], where: {viaje_estado: 1} })
							.then(
								result5 => Factura.findAll({ attributes: ['factura_id', 'factura_nro'], where: {factura_estado: 1}, order: [['factura_nro', 'DESC']] })
								.then(
									result6 => res.json([result1, result2, result3, result4, result5, result6])
								)
							)
						)
					)
				)
			)
			.catch(error => { res.status(412).json(req.body) }) 
		}
		else {
			// console.log(">>>>>>>>> Parametro definido >>>>>>>")
			Carro.findAll({ attributes: ['carro_id', 'carro_placa'], where: {carro_estado: 1}, order: [['carro_placa', 'ASC']] })
			.then(
				result1 => Cliente.findAll({ attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc'], where: {cliente_estado: 1}, order:[['cliente_nombre', 'ASC']] })
				.then(
					result2 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'], where: {empleado_estado: 1}, order: [['empleado_nombre', 'ASC']] })
					.then(
						result3 => Lugar.findAll({ attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento'], where: {lugar_estado: 1}, order: [['lugar_distrito', 'ASC']] })
						.then(
							result4 => Viaje.findAll({ attributes: ['viaje_id', 'carro_id', 'empleado_id','lugarp_nombre', 'lugar_id', 'cliente_id', 'cliented_nombre', 'viaje_grt', 'viaje_detalle', 'viaje_fecsalida2', 'viaje_fecrecibido', 'viaje_factura'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Lugar, attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento']}, {model: Carro, attributes: ['carro_id','carro_placa']}, {model: Cliente, attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc']}], order: [['viaje_fecsalida2', 'DESC']], where: {viaje_grt: req.params.id, viaje_estado: 1} })
							.then(
								result5 => Factura.findAll({ attributes: ['factura_id', 'factura_nro'], where: {factura_estado: 1}, order: [['factura_nro', 'DESC']] })
								.then(
									result6 => res.json([result1, result2, result3, result4, result5, result6])
								)
							)
						)
					)
				)
			)
			.catch(error => { res.status(412).json(req.body) }) 
		}
	});

	// // get viaje
	// app.get('/viajes', (req, res) => {
	// 	console.log('------> SIMPLE GET')
	// 	Carro.findAll({ attributes: ['carro_id', 'carro_placa'] })
	// 	.then(
	// 		result1 => Cliente.findAll({ attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc'] })
	// 		.then(
	// 		   result2 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'] })
	// 		 	.then(
	// 			   result3 => Lugar.findAll({ attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento'] })
	// 				.then(
	// 				   result4 => Viaje.findAll({ attributes: ['viaje_id', 'carro_id', 'empleado_id', 'lugar_id', 'cliente_id', 'cliente2_nombre', 'viaje_grt', 'viaje_detalle', 'viaje_fecsalida', 'viaje_fecrecibido'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Lugar, attributes: ['lugar_id', 'lugar_distrito', 'lugar_provincia', 'lugar_departamento']}, {model: Carro, attributes: ['carro_id','carro_placa']}, {model: Cliente, attributes: ['cliente_id', 'cliente_nombre', 'cliente_apepat', 'cliente_apemat', 'cliente_dniruc']}], order: [['viaje_fecsalida', 'DESC']], where: {viaje_estado: 1} })
	// 					.then(
	// 					   result5 => res.json([result1, result2, result3, result4, result5])
	// 					)
	// 				)
	// 			)
	// 		)
	// 	)
	// 	.catch(error => { res.status(412).json(req.body) }) 
	// });

	// add viaje
	app.post('/viajes', (req, res) => {
      // console.log("======>> " + req.body.cliente_id + "\n")
		if(!req.body.cliente_id)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Viaje.create(req.body)
			.then( () => { 
				res.send('Viaje Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update viaje
	app.put('/viajes/:id', (req, res)=>{
		// console.log("======>> " + req.body.clienteid + "\n")
		if(!req.body.clienteid)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Viaje.update(
				{ carro_id: req.body.carroid, empleado_id: req.body.empleadoid, lugarp_nombre: req.body.lugarp, lugar_id: req.body.lugarid, cliente_id: req.body.clienteid, cliented_nombre: req.body.cliented, viaje_grt: req.body.grt, viaje_detalle: req.body.detalle, viaje_fecsalida2: req.body.fecsalida2, viaje_fecrecibido: req.body.fecrecibido, viaje_factura: req.body.factura }, { where: {viaje_id: req.params.id} }
			)
			.then(()=>{
				res.send('Viaje Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}



// result3 => Tramite.findAll({ attributes: ['documento_id', 'tipodocumento_id', 'documento_tipoclipro', 'cliente_id', 'proveedor_id', 'documento_nro', 'documento_feccrea', 'documento_pago', 'documento_pagoTotal', 'documento_detalle', 'documento_feccan'], include: [{model: Cliente, attributes: ['cliente_id', 'cliente_nombre']}, {model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre']}, {model: Tipodocumento, attributes: ['tipodocumento_id', 'tipodocumento_nombre']}] })
// .then( result4 => res.json([result, result2, result3, result4]) )
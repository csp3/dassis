module.exports = app =>{
	const Carro = app.db.models.carros;
	const Empleado = app.db.models.empleados;
	const Efectivoviaje = app.db.models.efectivoviajes;

	// get efectivoviaje
	app.get('/efectivoviajes', (req, res) => {
		Carro.findAll({ attributes: ['carro_id', 'carro_placa'] })
		.then(
			result1 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'] })
			.then(
				result2 => Efectivoviaje.findAll({ attributes: ['efectivoviaje_id', 'efectivoviaje_fecha', 'carro_id', 'empleado_id', 'efectivoviaje_monto', 'efectivoviaje_tipo'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Carro, attributes: ['carro_id','carro_placa']} ]})
				.then(
					result3 => res.json([result1, result2, result3])
				)
			)
		)
		.catch(error => { res.status(412).json(req.body) }) 
	});

	// add efectivoviaje
	app.post('/efectivoviajes', (req, res) => {
      console.log("======>> " + req.body.efectivoviajes_fecha + "\n")
		if(!req.body.efectivoviajes_fecha)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Efectivoviaje.create(req.body)
			.then( () => { 
				res.send('EfectivoViaje Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});


	// update viaje
	// app.put('/viajes/:id', (req, res)=>{
	// 	console.log("======>> " + req.body.viajeid + "\n")
	// 	if(!req.body.viajeid)
	// 	{
	// 		res.status(400)
	// 		console.log("ERROR PUT")
	// 		res.json(req.body)
	// 	}
	// 	else
	// 	{
	// 		Viaje.update(
	// 			{ viaje_id: req.body.viajeid, carro_id: req.body.carroid, empleado_id: req.body.empleadoid, lugar_id: req.body.lugarid, cliente_id: req.body.clienteid, viaje_fecsalida: req.body.fecsalida, viaje_fecretorno: req.body.fecretorno }, { where: {viaje_id: req.params.id} }
	// 		)
	// 		.then(()=>{
	// 			res.send('Viaje Modificado');
	// 		})
	// 		.error(err => {
	// 			res.send('error: ' + err);
	// 		})
	// 	}
	// });
}

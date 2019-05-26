module.exports = app =>{
	const Repuesto = app.db.models.repuestos;
	const Carro = app.db.models.carros;
	const Empleado = app.db.models.empleados;

	// get repuesto
	app.get('/repuestos', (req, res) => {
		Carro.findAll({ attributes: ['carro_id', 'carro_placa'], where: {carro_estado: 1} })
		.then(
			result1 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'], where: {empleado_estado: 1} })
			.then(
			   result2 => Repuesto.findAll({ attributes: ['repuesto_id', 'carro_id', 'empleado_id', 'repuesto_codigo', 'repuesto_descripcion', 'repuesto_imagen', 'repuesto_fecingreso2', 'repuesto_importe'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Carro, attributes: ['carro_id','carro_placa']}], where: {repuesto_estado: 1} })
				.then(
				   result3 => res.json([result1, result2, result3])
				)
			)
		)
		.catch(error => { res.status(412).json(req.body) })
	});

	// add repuesto
	app.post('/repuestos', (req, res) => {
      console.log("======>> " + req.body.carro_id + "\n")
		if(!req.body.carro_id)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Repuesto.create(req.body)
			.then( () => { 
				res.send('Repuesto Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update repuesto
	app.put('/repuestos/:id', (req, res)=>{
		console.log("======>> " + req.body.carroid + "\n")
		if(!req.body.carroid)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Repuesto.update(
				{ empleado_id: req.body.empleadoid, carro_id: req.body.carroid, repuesto_codigo: req.body.codigo, repuesto_descripcion: req.body.descripcion, repuesto_fecingreso2: req.body.fecingreso2, repuesto_importe: req.body.importe, repuesto_imagen: req.body.imagen }, { where: {repuesto_id: req.params.id} }
			)
			.then(()=>{
				res.send('Repuesto Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});	
}
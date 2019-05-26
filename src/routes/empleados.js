module.exports = app =>{
	const Empleado = app.db.models.empleados;

	app.get('/empleados', (req, res) => {
		Empleado.findAll({where: {empleado_estado: 1}})
		.then(result => res.json(result))
		.catch(error => {
			res.status(412).json({msg: error.message})
		})
	});

	// add empleado
	app.post('/empleados', (req, res) => {
      // console.log("======>> " + req.body.empleado_dniruc + "\n")
		if(!req.body.empleado_dniruc)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Empleado.create(req.body)
			.then( () => { 
				res.send('Empleado Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// actualiza empleado 
	app.put('/empleados/:id', (req, res)=>{
		console.log("======>> " + req.body.dniruc + "\n")
		if(!req.body.dniruc)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Empleado.update(
				{ empleado_nombre: req.body.nombre, empleado_apepat: req.body.apepat, empleado_apemat: req.body.apemat, empleado_dniruc: req.body.dniruc, empleado_fecing: req.body.fecing, empleado_feclicencia: req.body.feclicencia, empleado_cargo: req.body.cargo, empleado_paga: req.body.paga, empleado_direccion: req.body.direccion, empleado_telefono: req.body.telefono, empleado_email: req.body.email, empleado_nacion: req.body.nacion }, { where: {empleado_id: req.params.id} }
			)
			.then(()=>{
				res.send('Empleado Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}
module.exports = app =>{
	const Reparacion = app.db.models.reparaciones;

	app.get('/reparaciones', (req,res) => {
		Reparacion.findAll({where: {reparacion_estado: 1}})
		.then(result => res.json(result))
		.catch(error => { 
			res.status(412).json({msg: error.message})
		})
	});

	// add reparacion
	app.post('/proveedores', (req, res) => {
      // console.log("======>> " + req.body.proveedor_nombre + "\n")
		if(!req.body.proveedor_nombre)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Proveedor.create(req.body)
			.then( () => { 
				res.send('Proveedor Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update proveedor
	app.put('/proveedores/:id', (req, res)=>{
		// console.log("======>> " + req.body.ruc + "\n")
		if(!req.body.ruc)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Proveedor.update(
				{ proveedor_nombre: req.body.nombre, proveedor_ruc: req.body.ruc, proveedor_tipo: req.body.tipo, proveedor_direccion: req.body.direccion, proveedor_telefono: req.body.telefono, proveedor_fecing: req.body.fecing, proveedor_email: req.body.email }, { where: {proveedor_id: req.params.id} }
			)
			.then(()=>{
				res.send('Proveedor Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}
module.exports = app =>{
	const Cliente = app.db.models.clientes;

	// get cliente
	app.get('/clientes', (req,res) => {
		Cliente.findAll({ where: {cliente_estado: 1} })
		.then(result => res.json(result))
		.catch(error => {
			res.status(412).json({msg: error.message})
		})
	});

	// add cliente
	app.post('/clientes', (req, res)=>{
		// console.log("======>> " + req.body.cliente_dniruc + "\n");
		if(!req.body.cliente_dniruc)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Cliente.create(req.body)
			.then( () => {
				res.send('Cliente Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// actualiza empleado 
	app.put('/clientes/:id', (req, res)=>{
		console.log("======>> " + req.body.dniruc + "\n")
		if(!req.body.dniruc)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Cliente.update(
				{ cliente_nombre: req.body.nombre, cliente_apepat: req.body.apepat, cliente_apemat: req.body.apemat, cliente_dniruc: req.body.dniruc, cliente_fecing: req.body.fecing, cliente_direccion: req.body.direccion, cliente_telefono: req.body.telefono, cliente_email: req.body.email, cliente_nacion: req.body.nacion }, { where: {cliente_id: req.params.id} }
			)
			.then(()=>{
				res.send('Cliente Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}


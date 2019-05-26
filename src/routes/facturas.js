module.exports = app =>{
	const Factura = app.db.models.facturas;
	const Cliente = app.db.models.clientes;

	// get factura
	app.get('/facturas', (req, res) => {
		Cliente.findAll({ attributes: ['cliente_id', 'cliente_dniruc', 'cliente_nombre'], where: {cliente_estado: 1}, order: [['cliente_nombre', 'ASC']] })
		.then(
			result1 => Factura.findAll({ attributes: ['factura_id', 'cliente_id', 'factura_nro', 'factura_fecha2', 'factura_total', 'factura_guias', 'factura_feccancela2'], include: [{model: Cliente, attributes: ['cliente_id', 'cliente_dniruc', 'cliente_nombre']}], order: [['factura_nro', 'DESC'], ['factura_fecha2', 'DESC']], where: {factura_estado: 1} })
			   .then( result2 => res.json([result1, result2]) )
		)
		.catch(error => { res.status(412).json(req.body) }) 
	});

	// add factura
	app.post('/facturas', (req, res) => { 
      console.log("======>> " + req.body.factura_fecha2 + "\n")
		if(!req.body.factura_fecha2)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Factura.create(req.body)
			.then( () => { 
				res.send('Factura Agregada')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update factura
	app.put('/facturas/:id', (req, res)=>{
		console.log("======>> " + req.body.clienteid + "\n")
		if(!req.body.clienteid)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Factura.update(
				{ cliente_id: req.body.clienteid, factura_nro: req.body.facturanro, factura_fecha2: req.body.facturafecha2, factura_total: req.body.facturatotal, factura_guias: req.body.facturaguias, factura_feccancela2: req.body.facturafeccancela2 }, { where: {factura_id: req.params.id} }
			)
			.then(()=>{
				res.send('Factura Modificada');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}
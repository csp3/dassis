module.exports = app =>{
	const Documento = app.db.models.documentos;
	const Cliente = app.db.models.clientes;
	const Proveedor = app.db.models.proveedores;
	const Tipodocumento = app.db.models.tipodocumentos;

	// get documento
	app.get('/documentos', (req, res) => {
		Cliente.findAll({ attributes: ['cliente_id','cliente_nombre'] })
		.then( 
			result => Proveedor.findAll({ attributes: ['proveedor_id', 'proveedor_nombre'] })
				.then( 
					result2 => Tipodocumento.findAll({ attributes: ['tipodocumento_id', 'tipodocumento_nombre'] })
						.then(
							result3 => Documento.findAll({ attributes: ['documento_id', 'tipodocumento_id', 'documento_tipoclipro', 'cliente_id', 'proveedor_id', 'documento_nro', 'documento_feccrea', 'documento_pago', 'documento_pagoTotal', 'documento_contenido', 'documento_feccan'], include: [{model: Cliente, attributes: ['cliente_id', 'cliente_nombre']}, {model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre']}, {model: Tipodocumento, attributes: ['tipodocumento_id', 'tipodocumento_nombre']}] })
							.then( result4 => res.json([result, result2, result3, result4]) )
						)
				)
		)
		.catch(error => { res.status(412).json({msg: error.message}) }) 
	});

	// add documento
	app.post('/documentos', (req, res) => {
      console.log("======>> " + req.body.documento_nro + "\n")
		if(!req.body.documento_nro)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Documento.create(req.body)
			.then( () => { 
				res.send('Documento Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update documento
	app.put('/documentos/:id', (req, res)=>{
		console.log("======>> " + req.body.nro + "\n")
		if(!req.body.nro)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Documento.update(
				{ tipodocumento_id: req.body.tipodoc, documento_tipoclipro: req.body.tipoclipro, cliente_id: req.body.tipoC, proveedor_id: req.body.tipoP, documento_nro: req.body.nro, documento_feccrea: req.body.feccrea, documento_pago: req.body.pago, documento_pagoTotal: req.body.pagoTotal, documento_detalle: req.body.detalle, documento_feccan: req.body.feccan }, { where: {documento_id: req.params.id} }
			)
			.then(()=>{
				res.send('Documento Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}

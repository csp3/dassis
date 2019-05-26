module.exports = app =>{
	const Tramite = app.db.models.tramites;
	const Empleado = app.db.models.empleados;
	const Tipotramite = app.db.models.tipotramites;
	const Documento = app.db.models.documentos;
	const Cliente = app.db.models.clientes;
	const Proveedor = app.db.models.proveedores;
	const Tipodocumento = app.db.models.tipodocumentos;

	// get tramite
	app.get('/tramites', (req, res) => {
		Cliente.findAll({ attributes: ['cliente_id', 'cliente_nombre'] })
		.then(
			result1 => Proveedor.findAll({ attributes: ['proveedor_id', 'proveedor_nombre'] })
			.then(
				result2 => Tipodocumento.findAll({ attributes: ['tipodocumento_id', 'tipodocumento_nombre'] })
				.then(
					result3 => Documento.findAll({ attributes: ['documento_id', 'documento_nro'], include:[{model: Cliente, attributes: ['cliente_id', 'cliente_nombre']}, {model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre']}, {model: Tipodocumento, attributes: ['tipodocumento_id', 'tipodocumento_nombre']}] })
					.then(
						result4 => Empleado.findAll({ attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat'] })
						.then( 
							result5 => Tipotramite.findAll({ attributes: ['tipotramite_id', 'tipotramite_describe'] })
							.then(
								result6 => Tramite.findAll({ attributes: ['tramite_id', 'documento_id', 'empleado_id', 'tipotramite_id', 'tramite_fecsalida', 'tramite_fecregreso'], include: [{model: Empleado, attributes: ['empleado_id', 'empleado_nombre', 'empleado_apepat', 'empleado_apemat']}, {model: Tipotramite, attributes: ['tipotramite_id', 'tipotramite_describe']}, {model: Documento, attributes: ['documento_id','documento_tipoclipro','documento_nro', 'cliente_id', 'proveedor_id', 'tipodocumento_id'], include:[{model: Cliente, attributes: ['cliente_id', 'cliente_nombre']}, {model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre']}, {model: Tipodocumento, attributes: ['tipodocumento_id', 'tipodocumento_nombre']}]}] })
								.then(
									result7 => res.json([result1, result2, result3, result4, result5, result6, result7])
								)
							)
						)
					)
				)
			)
		)
		.catch(error => { res.status(412).json(req.body) }) 
	});

	// add tramite
	app.post('/tramites', (req, res) => {
      console.log("======>> " + req.body.documento_id + "\n")
		if(!req.body.documento_id)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Tramite.create(req.body)
			.then( () => { 
				res.send('Tramite Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});


	// update tramite
	app.put('/tramites/:id', (req, res)=>{
		console.log("======>> " + req.body.documentoid + "\n")
		if(!req.body.documentoid)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Tramite.update(
				{ documento_id: req.body.documentoid, empleado_id: req.body.empleadoid, tipotramite_id: req.body.tipotramiteid, tramite_fecsalida: req.body.fecsalida, tramite_fecregreso: req.body.fecregreso }, { where: {tramite_id: req.params.id} }
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



// result3 => Tramite.findAll({ attributes: ['documento_id', 'tipodocumento_id', 'documento_tipoclipro', 'cliente_id', 'proveedor_id', 'documento_nro', 'documento_feccrea', 'documento_pago', 'documento_pagoTotal', 'documento_detalle', 'documento_feccan'], include: [{model: Cliente, attributes: ['cliente_id', 'cliente_nombre']}, {model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre']}, {model: Tipodocumento, attributes: ['tipodocumento_id', 'tipodocumento_nombre']}] })
// .then( result4 => res.json([result, result2, result3, result4]) )
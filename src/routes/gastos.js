const sequelize = require('sequelize');
module.exports = app =>{
	const Gasto = app.db.models.gastos;
	const Proveedor = app.db.models.proveedores;
	const Carro = app.db.models.carros;

	// get gastos 
	app.get('/gastos', (req, res) => {
		Proveedor.findAll({ attributes: ['proveedor_id', 'proveedor_nombre', 'proveedor_ruc'], where: {proveedor_estado: 1}, order: [['proveedor_nombre', 'ASC']] })
		.then(
			result1 => Carro.findAll({ attributes: ['carro_id', 'carro_placa'], where: {carro_estado: 1}, order: [['carro_placa', 'ASC']] })
			.then(
				result2 => Gasto.findAll({ attributes: ['gasto_id', 'proveedor_id', 'carro_id', 'gasto_detalle','gasto_importe', 'gasto_factura', 'gasto_fecha2'], include: [{model: Proveedor, attributes: ['proveedor_id', 'proveedor_nombre', 'proveedor_ruc']}, {model: Carro, attributes: ['carro_id', 'carro_placa']}], order: [['gasto_fecha2', 'DESC'],[sequelize.literal('Carro.carro_placa'), 'ASC']], where: {gasto_estado: 1} })
			   .then( result3 => res.json([result1, result2, result3]) )
			)
		)
		.catch(error => { res.status(412).json({msg: error.message}) }) 
	});

	// add gastos
	app.post('/gastos', (req, res) => {
      console.log("======>> " + req.body.gasto_fecha2 + "\n")
		if(!req.body.gasto_fecha2)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Gasto.create(req.body)
			.then( () => { 
				res.send('Gasto Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});


	// update gastos 
	app.put('/gastos/:id', (req, res)=>{
		console.log("======>> " + req.body.proveedorid + "\n")
		if(!req.body.proveedorid)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Gasto.update(
				{ proveedor_id: req.body.proveedorid, carro_id: req.body.carroid, gasto_detalle: req.body.detalle, gasto_importe: req.body.importe, gasto_factura: req.body.factura, gasto_fecha2: req.body.fecha2 }, { where: {gasto_id: req.params.id} }
			)
			.then(()=>{
				res.send('Gasto Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}

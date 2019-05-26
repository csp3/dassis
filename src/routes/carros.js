module.exports = app =>{
	const Carro = app.db.models.carros;

	// add carros
	app.get('/carros', (req,res) => {
		Carro.findAll({where: {carro_estado: 1}})
		.then(result => res.json(result))
		.catch(error => { res.status(412).json(req.body) }) 
	});

	// update carros
	app.put('/carros/:id', (req, res)=>{
		// console.log("======>> " + req.body.placa + "\n")
		if(!req.body.placa)
		{
			res.status(400)
			console.log("ERROR PUT")
			res.json(req.body)
		}
		else
		{
			Carro.update(
				{ carro_constancia: req.body.constancia, carro_seriechasis: req.body.seriechasis, carro_categoria: req.body.categoria, carro_modelo: req.body.modelo, carro_placa: req.body.placa, carro_marca: req.body.marca, carro_ejes: req.body.ejes, carro_aniofab: req.body.aniofab, carro_carga: req.body.carga, carro_soatfec: req.body.soatfec, carro_revtecfec: req.body.revtecfec, carro_extinfec: req.body.extinfec }, { where: {carro_id: req.params.id} }
			)
			.then(()=>{
				res.send('Carro Modificado');
			})
			.error(err => {
				res.send('error: ' + err);
			})
		}
	});
}
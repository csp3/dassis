module.exports = app =>{
	const Lugar = app.db.models.lugares;
	
	// get lugar
	app.get('/lugares', (req, res) => {
		Lugar.findAll({where: {lugar_estado: 1}})
		.then(result => res.json(result))
		.catch(error => { res.status(412).json({msg: error.message}) }) 
	});

   // add lugar
	app.post('/lugares', (req, res) => {
      // console.log("======>> " + req.body.lugar_distrito + "\n")
		if(!req.body.lugar_distrito)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Lugar.create(req.body)
			.then( () => { 
				res.send('Lugar Agregado')
			})
			.catch(err => { 
				res.send('error: ' + err)
			})
		}
	});

	// update lugar
	app.put('/lugares/:id', (req, res)=>{
      // console.log("======>> " + req.body.distrito + "\n")
		if(!req.body.distrito)
		{
			res.status(400)
			console.log("ERROR POST")
			res.json(req.body)
		}
		else
		{
			Lugar.update(
				{ lugar_distrito: req.body.distrito, lugar_provincia: req.body.provincia, lugar_departamento: req.body.departamento }, { where: {lugar_id: req.params.id} }
			)
			.then(()=>{
				res.send('Lugar Modificado');
			})
			.error(err => {
				res.send('error:  ' + err);
			})
		}
	});
}
module.exports = app =>{
	const Tipotramite = app.db.models.tipotramites;

	app.get('/tipotramites', (req,res) => {
		Tipotramite.findAll()
		.then(result => res.json(result))
		.catch(error => { 
			res.status(412).json({msg: error.message})
		})
	});
}
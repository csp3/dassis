module.exports = app =>{
	const Tipodocumento = app.db.models.tipodocumentos;

	app.get('/tipodocumentos', (req,res) => {
		Tipodocumento.findAll()
		.then(result => res.json(result))
		.catch(error => { 
			res.status(412).json({msg: error.message})
		})
	});
}
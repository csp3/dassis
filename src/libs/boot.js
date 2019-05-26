module.exports = app => {
	app.db.sequelize.sync().done(()=>{
		app.listen(app.get('port'), () => {
			console.log('server escuchando in ' + app.get('port'));
		});
	});
}

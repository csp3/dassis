module.exports = (sequelize, DataTypes) => {
	const lugares = sequelize.define('lugares', {
		lugar_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		lugar_distrito: {
			type: DataTypes.STRING
		},
		lugar_provincia: {
			type: DataTypes.STRING
		},
		lugar_departamento: {
			type: DataTypes.STRING
		}, 
		lugar_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	lugares.associate = (models) => {
		lugares.hasMany(models.viajes);
	}
	 
	return lugares;
}
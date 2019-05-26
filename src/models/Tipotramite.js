module.exports = (sequelize, DataTypes) => {
	const tipotramites = sequelize.define('tipotramites', {
		tipotramite_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		tipotramite_describe: {
			type: DataTypes.STRING
		},
		tipotramite_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
	});

	tipotramites.associate = (models) => {
		tipotramites.hasMany(models.tramites);
	}
	
	return tipotramites;
}
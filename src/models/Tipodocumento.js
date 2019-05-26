module.exports = (sequelize, DataTypes) => {
	const tipodocumentos = sequelize.define('tipodocumentos', {
		tipodocumento_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
      tipodocumento_nombre: {
         type: DataTypes.STRING
      },
      tipodocumento_estado: {
         type: DataTypes.INTEGER
      }
	},
	{
		timestamps: false
   });

	tipodocumentos.associate = (models) => {
		tipodocumentos.hasMany(models.documentos);
	}
	
	return tipodocumentos;
}
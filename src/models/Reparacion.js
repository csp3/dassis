module.exports = (sequelize, DataTypes) => {
	const reparaciones = sequelize.define('reparaciones', {
		reparacion_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		carro_id: {
			type: DataTypes.INTEGER
		},
      reparacion_qh: {
         type: DataTypes.STRING
      },
      reparacion_qu: {
         type: DataTypes.STRING
      },
      reparacion_fecha: {
         type: DataTypes.DATE
      },
      reparacion_estado: {
         type: DataTypes.INTEGER
      }
	},
	{
		timestamps: false
   });

	reparaciones.associate = (models) => {
		reparaciones.belongsTo(models.carros, {
			foreignKey: 'carro_id',
			targetKey: 'carro_id'
		});
	}
	
	return reparaciones;
}
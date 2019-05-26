module.exports = (sequelize, DataTypes) => {
	const efectivoviajes = sequelize.define('efectivoviajes', {
		efectivoviaje_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		efectivoviaje_fecha: {
			type: DataTypes.STRING
		},
		carro_id: {
			type: DataTypes.INTEGER
		},
		empleado_id: {
			type: DataTypes.INTEGER
		},
		efectivoviaje_monto: {
			type: DataTypes.DECIMAL
		},
		efectivoviaje_tipo: {
			type: DataTypes.STRING
		},
		efectivoviaje_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	efectivoviajes.associate = (models) => {
		efectivoviajes.belongsTo(models.carros, {
			foreignKey: 'carro_id',
			targetKey: 'carro_id'
		});
		efectivoviajes.belongsTo(models.empleados, {
			foreignKey: 'empleado_id',
			targetKey: 'empleado_id'
		});
	}
	 
	return efectivoviajes; 
}
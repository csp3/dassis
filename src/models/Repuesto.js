module.exports = (sequelize, DataTypes) => {
	const repuestos = sequelize.define('repuestos', {
		repuesto_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		carro_id: {
			type: DataTypes.INTEGER
		},
		empleado_id: {
			type: DataTypes.INTEGER
		},
		repuesto_codigo: {
			type: DataTypes.STRING
		},
		repuesto_descripcion: {
			type: DataTypes.STRING
		},
		repuesto_imagen: {
			type: DataTypes.STRING
		},
		repuesto_fecingreso: {
			type: DataTypes.STRING
		},
		repuesto_fecingreso2: {
			type: DataTypes.DATE
		},
		repuesto_importe: {
			type: DataTypes.DECIMAL
		},
		repuesto_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
	});
	
	repuestos.associate = (models) => {
		repuestos.belongsTo(models.carros, {
			foreignKey: 'carro_id',
			targetKey: 'carro_id'
		});
		repuestos.belongsTo(models.empleados, {
			foreignKey: 'empleado_id',
			targetKey: 'empleado_id'
		});
	}

	return repuestos; 
}
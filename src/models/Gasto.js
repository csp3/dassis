module.exports = (sequelize, DataTypes) => {
	const gastos = sequelize.define('gastos', {
		gasto_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		proveedor_id: {
			type: DataTypes.INTEGER
		},
		carro_id: {
			type: DataTypes.INTEGER
		}, 
		gasto_detalle: {
			type: DataTypes.STRING
		},
		gasto_importe: {
			type: DataTypes.DECIMAL
		},
		gasto_factura: {
			type: DataTypes.STRING
		},
		gasto_fecha: {
			type: DataTypes.STRING
		},
		gasto_fecha2: {
			type: DataTypes.STRING
		},
		gasto_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	gastos.associate = (models) => {
      gastos.belongsTo(models.proveedores, {
			foreignKey: 'proveedor_id',
			targetKey: 'proveedor_id'
		});
		gastos.belongsTo(models.carros, {
			foreignKey: 'carro_id',
			targetKey: 'carro_id'
		});
	}
	 
	return gastos; 
}
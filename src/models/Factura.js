module.exports = (sequelize, DataTypes) => {
	const facturas = sequelize.define('facturas', {
		factura_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cliente_id: {
			type: DataTypes.INTEGER
		},
		factura_nro: {
			type: DataTypes.STRING
		},
		factura_fecha: {
			type: DataTypes.STRING
		},
		factura_fecha2: {
			type: DataTypes.DATE
		},
		factura_total: {
			type: DataTypes.DECIMAL
		},
		factura_guias: { 
			type: DataTypes.STRING
		},
		factura_feccancela: {
			type: DataTypes.STRING
		},
		factura_feccancela2: {
			type: DataTypes.DATE
		},
		factura_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	facturas.associate = (models) => {
		facturas.belongsTo(models.clientes, {
			foreignKey: 'cliente_id',
			targetKey: 'cliente_id'
		});
	}
	 
	return facturas; 
}
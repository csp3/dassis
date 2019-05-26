module.exports = (sequelize, DataTypes) => {
	const clientes = sequelize.define('clientes', {
		cliente_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		cliente_nombre: {
			type: DataTypes.STRING
		}, 
		cliente_apepat: {
			type: DataTypes.STRING
		},
		cliente_apemat: {
			type: DataTypes.STRING
		},
		cliente_dniruc: { 
			type: DataTypes.STRING
		},
		cliente_fecing: {
			type: DataTypes.STRING
		},
		cliente_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	clientes.associate = (models) => {
		clientes.hasMany(models.documentos);
		clientes.hasMany(models.viajes);
		clientes.hasMany(models.facturas);
	}
	 
	return clientes; 
}
module.exports = (sequelize, DataTypes) => {
	const viajes = sequelize.define('viajes', {
		viaje_id: {
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
		lugarp_nombre: {
			type: DataTypes.STRING
		},
		lugar_id: {
			type: DataTypes.INTEGER
		},
		cliente_id: {
			type: DataTypes.INTEGER
		},
		cliented_nombre: {
			type: DataTypes.STRING
		},
		viaje_grt: {
			type: DataTypes.STRING
		},
		viaje_detalle: {
			type: DataTypes.STRING
		},
		viaje_fecsalida: {
			type: DataTypes.STRING
		},
		viaje_fecsalida2: {
			type: DataTypes.DATE
		}, 
		viaje_fecrecibido: {
			type: DataTypes.STRING
		},
		viaje_factura: {
			type: DataTypes.STRING
		},
		viaje_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	viajes.associate = (models) => {
		viajes.belongsTo(models.carros, {
			foreignKey: 'carro_id',
			targetKey: 'carro_id'
		});
		viajes.belongsTo(models.empleados, {
			foreignKey: 'empleado_id',
			targetKey: 'empleado_id'
		});
		viajes.belongsTo(models.lugares, {
			foreignKey: 'lugar_id',
			targetKey: 'lugar_id'
		});
		viajes.belongsTo(models.clientes, {
			foreignKey: 'cliente_id',
			targetKey: 'cliente_id'
		});
	}
	 
	return viajes; 
}
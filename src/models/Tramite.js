module.exports = (sequelize, DataTypes) => {
	const tramites = sequelize.define('tramites', {
		tramite_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		tramite_fecsalida: {
			type: DataTypes.STRING
		},
		tramite_fecregreso: {
			type: DataTypes.STRING
		},
		tramite_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
	});

	tramites.associate = (models) => {
		tramites.belongsTo(models.documentos, {
			foreignKey: 'documento_id',
			targetKey: 'documento_id'
		});
		tramites.belongsTo(models.tipotramites, {
			foreignKey: 'tipotramite_id',
			targetKey: 'tipotramite_id'
		});
		tramites.belongsTo(models.empleados, {
			foreignKey: 'empleado_id',
			targetKey: 'empleado_id'
		});
	}
	
	return tramites;
}
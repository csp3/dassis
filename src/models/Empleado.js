module.exports = (sequelize, DataTypes) => {
	const empleados = sequelize.define('empleados', {
		empleado_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		empleado_nombre: {
			type: DataTypes.STRING
		}, 
		empleado_apepat: {
			type: DataTypes.STRING
		},
		empleado_apemat: {
			type: DataTypes.STRING
		},
		empleado_dniruc: { 
			type: DataTypes.STRING
		},
		empleado_fecing: {
			type: DataTypes.STRING
		},
		empleado_feclicencia: {
			type: DataTypes.STRING
		},
		empleado_paga: {
			type: DataTypes.STRING
		},
		empleado_cargo: {
			type: DataTypes.STRING
		},
		empleado_direccion: {
			type: DataTypes.STRING
		},
		empleado_telefono: {
			type: DataTypes.STRING
		},
		empleado_email: {
			type: DataTypes.STRING
		},
		empleado_nacion: {
			type: DataTypes.STRING
		},
		empleado_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	empleados.associate = (models) => {
		empleados.hasMany(models.tramites);
		empleados.hasMany(models.viajes);
		empleados.hasMany(models.efectivoviajes);
		empleados.hasMany(models.repuestos);
	}
	
	return empleados;
}
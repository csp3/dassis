module.exports = (sequelize, DataTypes) => {
	const carros = sequelize.define('carros', {
		carro_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		carro_constancia: {
			type: DataTypes.STRING
		},
		carro_seriechasis: {
			type: DataTypes.STRING
		},
		carro_modelo: {
			type: DataTypes.STRING
		},
		carro_categoria: {
			type: DataTypes.STRING
		},
		carro_placa: {
			type: DataTypes.STRING
		},
		carro_marca: {
			type: DataTypes.STRING
		},
		carro_ejes: {
			type: DataTypes.STRING
		},
		carro_aniofab: {
			type: DataTypes.STRING
		},
		carro_carga: {
			type: DataTypes.STRING
		},
		carro_motor: {
			type: DataTypes.STRING
		},
		carro_soatfec: {
			type: DataTypes.STRING
		},
		carro_extinfec: {
			type: DataTypes.STRING
		},
		carro_revtecfec: {
			type: DataTypes.STRING
		},
		carro_estado: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false
   });

	carros.associate = (models) => {
		// carros.hasMany(models.facturas);
		carros.hasMany(models.viajes);
		carros.hasMany(models.gastos);
		carros.hasMany(models.efectivoviajes);
		carros.hasMany(models.repuestos);
		carros.hasMany(models.reparaciones);
	}
	
	return carros;
}
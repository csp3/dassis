module.exports = (sequelize, DataTypes) => {
	const proveedores = sequelize.define('proveedores', {
		proveedor_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
      proveedor_nombre: {
         type: DataTypes.STRING
      },
      proveedor_ruc: {
         type: DataTypes.STRING
      },
      proveedor_tipo: {
         type: DataTypes.STRING
      },
      proveedor_direccion: {
         type: DataTypes.STRING
      },
      proveedor_telefono: {
         type: DataTypes.STRING
      },
      proveedor_email: {
         type: DataTypes.STRING
      },
      proveedor_fecing: {
         type: DataTypes.STRING
      },
      proveedor_estado: {
         type: DataTypes.INTEGER
      }
	},
	{
		timestamps: false
   });

	proveedores.associate = (models) => {
		proveedores.hasMany(models.documentos);
		proveedores.hasMany(models.gastos);
	}
	
	return proveedores;
}
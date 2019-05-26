module.exports = (sequelize, DataTypes) => {
	const documentos = sequelize.define('documentos', {
		documento_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
      documento_tipoclipro: {
         type: DataTypes.STRING
      },
      documento_nro: {
         type: DataTypes.STRING
      },
      documento_feccrea: {
         type: DataTypes.STRING
		},
		documento_contenido: {
			type: DataTypes.STRING
		},
      documento_pago: {
         type: DataTypes.DECIMAL
      },
      documento_pagoTotal: {
         type: DataTypes.DECIMAL
      },
      documento_feccan: {
         type: DataTypes.STRING
      },
      documento_estado: {
         type: DataTypes.INTEGER
      }
	},
	{
		timestamps: false
   });

	documentos.associate = (models) => {
		documentos.hasMany(models.tramites);
		documentos.belongsTo(models.clientes, {
			foreignKey: 'cliente_id',
			targetKey: 'cliente_id'
		});
		documentos.belongsTo(models.proveedores, {
			foreignKey: 'proveedor_id',
			targetKey: 'proveedor_id'
		});
		documentos.belongsTo(models.tipodocumentos, {
			foreignKey: 'tipodocumento_id',
			targetKey: 'tipodocumento_id'
		});
	}
	
	return documentos;
}
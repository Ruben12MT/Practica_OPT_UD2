const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bank_branch', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    n_tellers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monthly_income: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    opening_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    id_bank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bank',
        key: 'id'
      }
    },
    url_image: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bank_branch',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "banco_id",
        using: "BTREE",
        fields: [
          { name: "id_bank" },
        ]
      },
    ]
  });
};

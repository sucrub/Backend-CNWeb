const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item-picture', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_specific_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item-specific',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'item-picture',
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
        name: "item_specific_id",
        using: "BTREE",
        fields: [
          { name: "item_specific_id" },
        ]
      },
    ]
  });
};

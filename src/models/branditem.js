const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "branditem",
    {
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "brands",
          key: "id",
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "items",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "branditem",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "brand_id" }, { name: "item_id" }],
        },
        {
          name: "item_id",
          using: "BTREE",
          fields: [{ name: "item_id" }],
        },
      ],
    }
  );
};

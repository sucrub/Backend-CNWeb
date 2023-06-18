const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "brand_category",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    },
    {
      tableName: "brand_category",
      timestamps: false,
      indexes: [
        {
          fields: [{ name: "category_id" }, { name: "brand_id" }],
          unique: true,
        },
      ],
    }
  );
};
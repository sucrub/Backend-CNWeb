const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "leaf_categories",
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        leaf_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    },
    {
      tableName: "leaf_categories",
      timestamps: false,
      indexes: [
        {
          fields: [{ name: "category_id" }, { name: "leaf_category_id" }],
          unique: true,
        },
      ],
    }
  );
};
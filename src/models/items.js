const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "items",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sellers",
          key: "id",
        },
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number_of_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number_sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "brands",
          key: "id",
        },
      }
    },
    {
      sequelize,
      tableName: "items",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "seller_id",
          using: "BTREE",
          fields: [{ name: "seller_id" }],
        },
        // {
        //   name: "category_id",
        //   using: "BTREE",
        //   fields: [{ name: "category_id" }],
        // },
      ],
    }
  );
};

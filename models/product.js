"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.product.hasMany(models.info, {
        foreignKey: "id_product",
      });

      // define association here
    }
  }
  product.init(
    {
      noInvoice: DataTypes.INTEGER,
      itemName: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalCogs: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: false,
      timestamps: true,
      modelName: "product",
    }
  );
  return product;
};

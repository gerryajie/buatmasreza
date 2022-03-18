"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.info.belongsTo(models.invoice, {
        foreignKey: "id_invoice",
      });
      models.info.belongsTo(models.product, {
        foreignKey: "id_product",
      });
    }
  }
  info.init(
    {
      id_invoice: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: false,
      timestamps: true,
      modelName: "info",
    }
  );
  return info;
};

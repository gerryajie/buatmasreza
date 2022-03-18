"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.invoice.hasMany(models.info, {
        foreignKey: "id_invoice",
      });

      // define association here
    }
  }
  invoice.init(
    {
      noInvoice: DataTypes.INTEGER,
      date: DataTypes.DATE,
      customerName: DataTypes.STRING,
      salesPersonName: DataTypes.STRING,
      paymentType: DataTypes.ENUM("CASH", "CREDIT"),
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: false,
      timestamps: true,
      modelName: "invoice",
    }
  );
  return invoice;
};

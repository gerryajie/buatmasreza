"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noInvoice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      customerName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      salesPersonName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paymentType: {
        allowNull: false,
        type: Sequelize.DataTypes.ENUM,
        values: ["CASH", "CREDIT"],
        defaultValue: "CASH",
      },
      notes: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("invoices");
  },
};

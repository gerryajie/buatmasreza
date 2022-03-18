"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_invoice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_product: {
        allowNull: false,
        type: Sequelize.INTEGER,
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

    await queryInterface.addConstraint("infos", {
      fields: ["id_invoice"],
      type: "foreign key",
      name: "custom_fkey_id_invoice",
      references: {
        //Required field
        table: "invoices",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("infos", {
      fields: ["id_product"],
      type: "foreign key",
      name: "custom_fkey_id_product",
      references: {
        //Required field
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("infos");
  },
};

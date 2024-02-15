"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("useraddresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      streetAddress: { type: Sequelize.STRING, required: true },
      city: { type: Sequelize.STRING, required: true },
      state: { type: Sequelize.STRING, required: true },
      postalCode: { type: Sequelize.STRING, required: true },
      country: { type: Sequelize.STRING, required: true },
      userId: {
        type: Sequelize.UUID,
        required: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("useraddresses");
  },
};

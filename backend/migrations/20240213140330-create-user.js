"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: { type: Sequelize.STRING, required: true },
      lastName: { type: Sequelize.STRING, required: true },
      dob: { type: Sequelize.DATE, required: true },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: { type: Sequelize.STRING, required: true },
      password: { type: Sequelize.STRING, required: true },
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
    return queryInterface.dropTable("users");
  },
};

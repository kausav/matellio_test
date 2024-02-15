"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: { type: DataTypes.STRING, required: true },
      lastName: { type: DataTypes.STRING, required: true },
      dob: { type: DataTypes.DATE, required: true },
      gender: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        required: true,
      },
      phoneNumber: { type: DataTypes.STRING, required: true },
      password: { type: DataTypes.STRING, required: true },
    },
    { timestamps: true }
  );

  user.beforeCreate((user, _) => {
    user.id = uuidv4();
  });

  user.beforeBulkCreate((users, _) => {
    users.forEach((user) => {
      user.id = uuidv4();
    });
  });
  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.useraddress, {
      foreignKey: "userId",
    });
  };
  return user;
};

"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const useraddress = sequelize.define(
    "useraddress",
    {
      streetAddress: { type: DataTypes.STRING, required: true },
      city: { type: DataTypes.STRING, required: true },
      state: { type: DataTypes.STRING, required: true },
      postalCode: { type: DataTypes.STRING, required: true },
      country: { type: DataTypes.STRING, required: true },
      userId: {
        type: DataTypes.UUID,
        required: true,
      },
    },
    { timestamps: true }
  );
  useraddress.beforeCreate((useraddress, _) => {
    useraddress.id = uuidv4();
  });

  useraddress.beforeBulkCreate((useraddresses, _) => {
    useraddresses.forEach((useraddress) => {
      useraddress.id = uuidv4();
    });
  });
  useraddress.associate = function (models) {
    // associations can be defined here
    useraddress.belongsTo(models.user, {
      localKey: "userId",
    });
  };
  return useraddress;
};

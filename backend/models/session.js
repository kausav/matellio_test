"use strict";
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
    {
      userId: DataTypes.UUID,
    },
    { timestamps: true }
  );
  session.associate = function (models) {
    // associations can be defined here
  };
  return session;
};

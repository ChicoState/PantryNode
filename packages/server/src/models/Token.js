const { DataTypes } = require("sequelize");
const sequelize = require("../services/sequelize-init");

const Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Token;

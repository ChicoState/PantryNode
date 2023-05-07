const sequelize = require("../services/sequelize-init");
const { DataTypes } = require("sequelize");
const Token = require("./Token");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Token, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Token.belongsTo(User);
module.exports = User;

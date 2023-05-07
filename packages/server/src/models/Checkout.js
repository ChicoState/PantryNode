const sequelize = require("../services/sequelize-init");
const { DataTypes } = require("sequelize");
const Stock = require("./Stock");

const Checkout = sequelize.define("Checkout", {
  cllgId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datePur: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Checkout.belongsTo(Stock);
Stock.hasMany(Checkout);

module.exports = Checkout;

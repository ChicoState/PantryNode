const sequelize = require("../services/sequelize-init");
const { DataTypes } = require("sequelize");
const Category = require("./Category");
const Stock = require("./Stock");

const Item = sequelize.define("Item", {
  ItemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ExpiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Item.belongsTo(Category);
Category.hasMany(Item);
Item.belongsTo(Stock);
Stock.hasMany(Item);

module.exports = Item;

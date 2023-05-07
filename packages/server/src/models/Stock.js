const sequelize = require("../services/sequelize-init");
const { DataTypes } = require("sequelize");
const Category = require("./Category");

const Stock = sequelize.define("Stock", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ExpiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

Stock.belongsTo(Category, { foreignKey: "category_id", unique: true });
Category.hasOne(Stock, { foreignKey: "category_id" });

module.exports = Stock;

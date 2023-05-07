const { DataTypes } = require("sequelize");
const sequelize = require("../services/sequelize-init");

const Donor = require("./Donor");
const Stock = require("./Stock");

const Donation = sequelize.define("Donation", {
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

Donation.belongsTo(Donor, { foreignKey: "donorId" });
Donor.hasMany(Donation, { foreignKey: "donorId" });
Donation.belongsTo(Stock, { foreignKey: "stock_id" });
Stock.hasMany(Donation, { foreignKey: "stock_id" });

module.exports = Donor;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction = void 0;
const sequelize_1 = require("sequelize");
class transaction extends sequelize_1.Model {
    static initModel(sequelize) {
        return transaction.init({
            trans_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            person_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'person',
                    key: 'person_id'
                }
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW
            },
            trans_type: {
                type: sequelize_1.DataTypes.ENUM("donation", "purchase", "throw out"),
                allowNull: true
            },
            site: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'site',
                    key: 'site_id'
                }
            }
        }, {
            sequelize,
            tableName: 'transaction',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "transaction_pkey",
                    unique: true,
                    fields: [
                        { name: "trans_id" },
                    ]
                },
            ]
        });
    }
}
exports.transaction = transaction;

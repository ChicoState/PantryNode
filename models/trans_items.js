"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trans_items = void 0;
const sequelize_1 = require("sequelize");
class trans_items extends sequelize_1.Model {
    static initModel(sequelize) {
        return trans_items.init({
            trans_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'transaction',
                    key: 'trans_id'
                }
            },
            trans_item_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            item_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            expiration: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'trans_items',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "trans_items_pkey",
                    unique: true,
                    fields: [
                        { name: "trans_item_id" },
                    ]
                },
            ]
        });
    }
}
exports.trans_items = trans_items;

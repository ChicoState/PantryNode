"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shelf_contents = void 0;
const sequelize_1 = require("sequelize");
class shelf_contents extends sequelize_1.Model {
    static initModel(sequelize) {
        return shelf_contents.init({
            self_conts_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            trans_item_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'trans_items',
                    key: 'trans_item_id'
                }
            },
            shelf_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'shelf',
                    key: 'shelf_id'
                }
            },
            store_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'shelf_contents',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "shelf_contents_pkey",
                    unique: true,
                    fields: [
                        { name: "self_conts_id" },
                    ]
                },
            ]
        });
    }
}
exports.shelf_contents = shelf_contents;

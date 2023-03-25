"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shelf = void 0;
const sequelize_1 = require("sequelize");
class shelf extends sequelize_1.Model {
    static initModel(sequelize) {
        return shelf.init({
            shelf_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            section_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'section',
                    key: 'section_id'
                }
            },
            capacity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'shelf',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "shelf_pkey",
                    unique: true,
                    fields: [
                        { name: "shelf_id" },
                    ]
                },
            ]
        });
    }
}
exports.shelf = shelf;

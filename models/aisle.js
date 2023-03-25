"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aisle = void 0;
const sequelize_1 = require("sequelize");
class aisle extends sequelize_1.Model {
    static initModel(sequelize) {
        return aisle.init({
            site_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'site',
                    key: 'site_id'
                }
            },
            aisle_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            info: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'aisle',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "aisle_pkey",
                    unique: true,
                    fields: [
                        { name: "aisle_id" },
                    ]
                },
            ]
        });
    }
}
exports.aisle = aisle;

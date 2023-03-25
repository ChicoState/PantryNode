"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.site = void 0;
const sequelize_1 = require("sequelize");
class site extends sequelize_1.Model {
    static initModel(sequelize) {
        return site.init({
            site_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            addr_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'address',
                    key: 'addr_id'
                }
            },
            name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'site',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "site_pkey",
                    unique: true,
                    fields: [
                        { name: "site_id" },
                    ]
                },
            ]
        });
    }
}
exports.site = site;

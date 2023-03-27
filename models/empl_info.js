"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empl_info = void 0;
const sequelize_1 = require("sequelize");
class empl_info extends sequelize_1.Model {
    static initModel(sequelize) {
        return empl_info.init({
            empl_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            perm_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'perm_id'
                }
            },
            role: {
                type: sequelize_1.DataTypes.ENUM("staff", "manager", "volunteer"),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'empl_info',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "empl_info_pkey",
                    unique: true,
                    fields: [
                        { name: "empl_id" },
                    ]
                },
            ]
        });
    }
}
exports.empl_info = empl_info;

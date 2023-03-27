"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const sequelize_1 = require("sequelize");
class permissions extends sequelize_1.Model {
    static initModel(sequelize) {
        return permissions.init({
            perm_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            perm_num: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'permissions',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "permissions_pkey",
                    unique: true,
                    fields: [
                        { name: "perm_id" },
                    ]
                },
            ]
        });
    }
}
exports.permissions = permissions;

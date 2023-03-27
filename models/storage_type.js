"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage_type = void 0;
const sequelize_1 = require("sequelize");
class storage_type extends sequelize_1.Model {
    static initModel(sequelize) {
        return storage_type.init({
            stor_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            stor_type: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: "storage_type_stor_type_key"
            }
        }, {
            sequelize,
            tableName: 'storage_type',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "storage_type_pkey",
                    unique: true,
                    fields: [
                        { name: "stor_id" },
                    ]
                },
                {
                    name: "storage_type_stor_type_key",
                    unique: true,
                    fields: [
                        { name: "stor_type" },
                    ]
                },
            ]
        });
    }
}
exports.storage_type = storage_type;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = void 0;
const sequelize_1 = require("sequelize");
class address extends sequelize_1.Model {
    static initModel(sequelize) {
        return address.init({
            person_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'person',
                    key: 'person_id'
                }
            },
            addr_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            addr_1: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            addr_2: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            city: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            state: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            zip: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            country: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'address',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "address_pkey",
                    unique: true,
                    fields: [
                        { name: "addr_id" },
                    ]
                },
            ]
        });
    }
}
exports.address = address;

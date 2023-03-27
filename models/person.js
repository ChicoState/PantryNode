"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.person = void 0;
const sequelize_1 = require("sequelize");
class person extends sequelize_1.Model {
    static initModel(sequelize) {
        return person.init({
            person_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            fname: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            lname: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: "person_email_key"
            },
            phone: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            pri_addr_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'address',
                    key: 'addr_id'
                }
            },
            empl_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'person',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "person_email_key",
                    unique: true,
                    fields: [
                        { name: "email" },
                    ]
                },
                {
                    name: "person_pkey",
                    unique: true,
                    fields: [
                        { name: "person_id" },
                    ]
                },
            ]
        });
    }
}
exports.person = person;

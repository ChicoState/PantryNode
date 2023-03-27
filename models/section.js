"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.section = void 0;
const sequelize_1 = require("sequelize");
class section extends sequelize_1.Model {
    static initModel(sequelize) {
        return section.init({
            section_id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            aisle_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'aisle',
                    key: 'aisle_id'
                }
            },
            stor_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'storage_type',
                    key: 'stor_id'
                }
            }
        }, {
            sequelize,
            tableName: 'section',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "section_pkey",
                    unique: true,
                    fields: [
                        { name: "section_id" },
                    ]
                },
            ]
        });
    }
}
exports.section = section;

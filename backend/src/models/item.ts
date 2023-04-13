import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { storage_type, storage_typeId } from './storage_type';

export interface itemAttributes {
  item_id: number;
  name?: string;
  category?: "produce" | "fruit" | "meat" | "dairy" | "baked goods" | "canned" | "snacks" | "beverage" | "condiments & spices" | "processed foods" | "other";
  stor_id: number;
  size?: number;
  barcode_num?:string;  // adding the barcode_num field
}

export type itemPk = "item_id";
export type itemId = item[itemPk];
export type itemOptionalAttributes = "item_id" | "name" | "category" | "size" | "barcode_num";
export type itemCreationAttributes = Optional<itemAttributes, itemOptionalAttributes>;

export class item extends Model<itemAttributes, itemCreationAttributes> implements itemAttributes {
  item_id!: number;
  name?: string;
  category?: "produce" | "fruit" | "meat" | "dairy" | "baked goods" | "canned" | "snacks" | "beverage" | "condiments & spices" | "processed foods" | "other";
  stor_id!: number;
  size?: number;
  barcode_num?: string;
  // item belongsTo storage_type via stor_id
  stor!: storage_type;
  getStor!: Sequelize.BelongsToGetAssociationMixin<storage_type>;
  setStor!: Sequelize.BelongsToSetAssociationMixin<storage_type, storage_typeId>;
  createStor!: Sequelize.BelongsToCreateAssociationMixin<storage_type>;
  
  static initModel(sequelize: Sequelize.Sequelize): typeof item {
    return item.init({
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "item_name_key"
    },
    category: {
      type: DataTypes.ENUM("produce","fruit","meat","dairy","baked goods","canned","snacks","beverage","condiments & spices","processed foods","other"),
      allowNull: true
    },
    stor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storage_type',
        key: 'stor_id'
      }
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    barcode_num: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "item_pkey",
        unique: true,
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });


  static async LookUpbarcode(barcode_num: string): Promise<item | null> {
    const result = await item.findOne({ where: { barcode_num } });
    return result || null;
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { item, itemId } from './item';
import type { section, sectionId } from './section';

export interface storage_typeAttributes {
  stor_id: number;
  stor_type: string;
}

export type storage_typePk = "stor_id";
export type storage_typeId = storage_type[storage_typePk];
export type storage_typeOptionalAttributes = "stor_id";
export type storage_typeCreationAttributes = Optional<storage_typeAttributes, storage_typeOptionalAttributes>;

export class storage_type extends Model<storage_typeAttributes, storage_typeCreationAttributes> implements storage_typeAttributes {
  stor_id!: number;
  stor_type!: string;

  // storage_type hasMany item via stor_id
  items!: item[];
  getItems!: Sequelize.HasManyGetAssociationsMixin<item>;
  setItems!: Sequelize.HasManySetAssociationsMixin<item, itemId>;
  addItem!: Sequelize.HasManyAddAssociationMixin<item, itemId>;
  addItems!: Sequelize.HasManyAddAssociationsMixin<item, itemId>;
  createItem!: Sequelize.HasManyCreateAssociationMixin<item>;
  removeItem!: Sequelize.HasManyRemoveAssociationMixin<item, itemId>;
  removeItems!: Sequelize.HasManyRemoveAssociationsMixin<item, itemId>;
  hasItem!: Sequelize.HasManyHasAssociationMixin<item, itemId>;
  hasItems!: Sequelize.HasManyHasAssociationsMixin<item, itemId>;
  countItems!: Sequelize.HasManyCountAssociationsMixin;
  // storage_type hasMany section via stor_id
  sections!: section[];
  getSections!: Sequelize.HasManyGetAssociationsMixin<section>;
  setSections!: Sequelize.HasManySetAssociationsMixin<section, sectionId>;
  addSection!: Sequelize.HasManyAddAssociationMixin<section, sectionId>;
  addSections!: Sequelize.HasManyAddAssociationsMixin<section, sectionId>;
  createSection!: Sequelize.HasManyCreateAssociationMixin<section>;
  removeSection!: Sequelize.HasManyRemoveAssociationMixin<section, sectionId>;
  removeSections!: Sequelize.HasManyRemoveAssociationsMixin<section, sectionId>;
  hasSection!: Sequelize.HasManyHasAssociationMixin<section, sectionId>;
  hasSections!: Sequelize.HasManyHasAssociationsMixin<section, sectionId>;
  countSections!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof storage_type {
    return storage_type.init({
    stor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stor_type: {
      type: DataTypes.TEXT,
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

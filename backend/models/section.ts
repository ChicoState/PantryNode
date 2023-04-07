import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { aisle, aisleId } from './aisle';
import type { shelf, shelfId } from './shelf';
import type { storage_type, storage_typeId } from './storage_type';

export interface sectionAttributes {
  section_id: number;
  aisle_id: number;
  stor_id: number;
}

export type sectionPk = "section_id";
export type sectionId = section[sectionPk];
export type sectionOptionalAttributes = "section_id";
export type sectionCreationAttributes = Optional<sectionAttributes, sectionOptionalAttributes>;

export class section extends Model<sectionAttributes, sectionCreationAttributes> implements sectionAttributes {
  section_id!: number;
  aisle_id!: number;
  stor_id!: number;

  // section belongsTo aisle via aisle_id
  aisle!: aisle;
  getAisle!: Sequelize.BelongsToGetAssociationMixin<aisle>;
  setAisle!: Sequelize.BelongsToSetAssociationMixin<aisle, aisleId>;
  createAisle!: Sequelize.BelongsToCreateAssociationMixin<aisle>;
  // section hasMany shelf via section_id
  shelves!: shelf[];
  getShelves!: Sequelize.HasManyGetAssociationsMixin<shelf>;
  setShelves!: Sequelize.HasManySetAssociationsMixin<shelf, shelfId>;
  addShelf!: Sequelize.HasManyAddAssociationMixin<shelf, shelfId>;
  addShelves!: Sequelize.HasManyAddAssociationsMixin<shelf, shelfId>;
  createShelf!: Sequelize.HasManyCreateAssociationMixin<shelf>;
  removeShelf!: Sequelize.HasManyRemoveAssociationMixin<shelf, shelfId>;
  removeShelves!: Sequelize.HasManyRemoveAssociationsMixin<shelf, shelfId>;
  hasShelf!: Sequelize.HasManyHasAssociationMixin<shelf, shelfId>;
  hasShelves!: Sequelize.HasManyHasAssociationsMixin<shelf, shelfId>;
  countShelves!: Sequelize.HasManyCountAssociationsMixin;
  // section belongsTo storage_type via stor_id
  stor!: storage_type;
  getStor!: Sequelize.BelongsToGetAssociationMixin<storage_type>;
  setStor!: Sequelize.BelongsToSetAssociationMixin<storage_type, storage_typeId>;
  createStor!: Sequelize.BelongsToCreateAssociationMixin<storage_type>;

  static initModel(sequelize: Sequelize.Sequelize): typeof section {
    return section.init({
    section_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    aisle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'aisle',
        key: 'aisle_id'
      }
    },
    stor_id: {
      type: DataTypes.INTEGER,
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

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { section, sectionId } from './section';
import type { site, siteId } from './site';

export interface aisleAttributes {
  site_id: number;
  aisle_id: number;
  info?: string;
}

export type aislePk = "aisle_id";
export type aisleId = aisle[aislePk];
export type aisleOptionalAttributes = "aisle_id" | "info";
export type aisleCreationAttributes = Optional<aisleAttributes, aisleOptionalAttributes>;

export class aisle extends Model<aisleAttributes, aisleCreationAttributes> implements aisleAttributes {
  site_id!: number;
  aisle_id!: number;
  info?: string;

  // aisle hasMany section via aisle_id
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
  // aisle belongsTo site via site_id
  site!: site;
  getSite!: Sequelize.BelongsToGetAssociationMixin<site>;
  setSite!: Sequelize.BelongsToSetAssociationMixin<site, siteId>;
  createSite!: Sequelize.BelongsToCreateAssociationMixin<site>;

  static initModel(sequelize: Sequelize.Sequelize): typeof aisle {
    return aisle.init({
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site',
        key: 'site_id'
      }
    },
    aisle_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aisle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "aisle_pkey",
        unique: true,
        fields: [
          { name: "aisle_id" },
        ]
      },
    ]
  });
  }
}

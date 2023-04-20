import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { section, sectionId } from './section';
import type { shelf_contents, shelf_contentsId } from './shelf_contents';

export interface shelfAttributes {
  shelf_id: number;
  section_id: number;
  capacity: number;
}

export type shelfPk = "shelf_id";
export type shelfId = shelf[shelfPk];
export type shelfOptionalAttributes = "shelf_id";
export type shelfCreationAttributes = Optional<shelfAttributes, shelfOptionalAttributes>;

export class shelf extends Model<shelfAttributes, shelfCreationAttributes> implements shelfAttributes {
  shelf_id!: number;
  section_id!: number;
  capacity!: number;

  // shelf belongsTo section via section_id
  section!: section;
  getSection!: Sequelize.BelongsToGetAssociationMixin<section>;
  setSection!: Sequelize.BelongsToSetAssociationMixin<section, sectionId>;
  createSection!: Sequelize.BelongsToCreateAssociationMixin<section>;
  // shelf hasMany shelf_contents via shelf_id
  shelf_contents!: shelf_contents[];
  getShelf_contents!: Sequelize.HasManyGetAssociationsMixin<shelf_contents>;
  setShelf_contents!: Sequelize.HasManySetAssociationsMixin<shelf_contents, shelf_contentsId>;
  addShelf_content!: Sequelize.HasManyAddAssociationMixin<shelf_contents, shelf_contentsId>;
  addShelf_contents!: Sequelize.HasManyAddAssociationsMixin<shelf_contents, shelf_contentsId>;
  createShelf_content!: Sequelize.HasManyCreateAssociationMixin<shelf_contents>;
  removeShelf_content!: Sequelize.HasManyRemoveAssociationMixin<shelf_contents, shelf_contentsId>;
  removeShelf_contents!: Sequelize.HasManyRemoveAssociationsMixin<shelf_contents, shelf_contentsId>;
  hasShelf_content!: Sequelize.HasManyHasAssociationMixin<shelf_contents, shelf_contentsId>;
  hasShelf_contents!: Sequelize.HasManyHasAssociationsMixin<shelf_contents, shelf_contentsId>;
  countShelf_contents!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof shelf {
    return shelf.init({
    shelf_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'section',
        key: 'section_id'
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shelf',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "shelf_pkey",
        unique: true,
        fields: [
          { name: "shelf_id" },
        ]
      },
    ]
  });
  }
}

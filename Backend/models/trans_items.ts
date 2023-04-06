import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { shelf_contents, shelf_contentsId } from './shelf_contents';
import type { transaction, transactionId } from './transaction';

export interface trans_itemsAttributes {
  trans_id: number;
  trans_item_id: number;
  item_id: number;
  quantity: number;
  expiration?: string;
}

export type trans_itemsPk = "trans_item_id";
export type trans_itemsId = trans_items[trans_itemsPk];
export type trans_itemsOptionalAttributes = "trans_item_id" | "expiration";
export type trans_itemsCreationAttributes = Optional<trans_itemsAttributes, trans_itemsOptionalAttributes>;

export class trans_items extends Model<trans_itemsAttributes, trans_itemsCreationAttributes> implements trans_itemsAttributes {
  trans_id!: number;
  trans_item_id!: number;
  item_id!: number;
  quantity!: number;
  expiration?: string;

  // trans_items hasMany shelf_contents via trans_item_id
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
  // trans_items belongsTo transaction via trans_id
  tran!: transaction;
  getTran!: Sequelize.BelongsToGetAssociationMixin<transaction>;
  setTran!: Sequelize.BelongsToSetAssociationMixin<transaction, transactionId>;
  createTran!: Sequelize.BelongsToCreateAssociationMixin<transaction>;

  static initModel(sequelize: Sequelize.Sequelize): typeof trans_items {
    return trans_items.init({
    trans_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transaction',
        key: 'trans_id'
      }
    },
    trans_item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'trans_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "trans_items_pkey",
        unique: true,
        fields: [
          { name: "trans_item_id" },
        ]
      },
    ]
  });
  }
}

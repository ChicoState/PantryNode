import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { shelf, shelfId } from './shelf';
import type { trans_items, trans_itemsId } from './trans_items';

export interface shelf_contentsAttributes {
  self_conts_id: number;
  trans_item_id: number;
  shelf_id: number;
  store_date: Date;
  quantity: number;
}

export type shelf_contentsPk = "self_conts_id";
export type shelf_contentsId = shelf_contents[shelf_contentsPk];
export type shelf_contentsOptionalAttributes = "self_conts_id";
export type shelf_contentsCreationAttributes = Optional<shelf_contentsAttributes, shelf_contentsOptionalAttributes>;

export class shelf_contents extends Model<shelf_contentsAttributes, shelf_contentsCreationAttributes> implements shelf_contentsAttributes {
  self_conts_id!: number;
  trans_item_id!: number;
  shelf_id!: number;
  store_date!: Date;
  quantity!: number;

  // shelf_contents belongsTo shelf via shelf_id
  shelf!: shelf;
  getShelf!: Sequelize.BelongsToGetAssociationMixin<shelf>;
  setShelf!: Sequelize.BelongsToSetAssociationMixin<shelf, shelfId>;
  createShelf!: Sequelize.BelongsToCreateAssociationMixin<shelf>;
  // shelf_contents belongsTo trans_items via trans_item_id
  trans_item!: trans_items;
  getTrans_item!: Sequelize.BelongsToGetAssociationMixin<trans_items>;
  setTrans_item!: Sequelize.BelongsToSetAssociationMixin<trans_items, trans_itemsId>;
  createTrans_item!: Sequelize.BelongsToCreateAssociationMixin<trans_items>;

  static initModel(sequelize: Sequelize.Sequelize): typeof shelf_contents {
    return shelf_contents.init({
    self_conts_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trans_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trans_items',
        key: 'trans_item_id'
      }
    },
    shelf_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shelf',
        key: 'shelf_id'
      }
    },
    store_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shelf_contents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "shelf_contents_pkey",
        unique: true,
        fields: [
          { name: "self_conts_id" },
        ]
      },
    ]
  });
  }
}

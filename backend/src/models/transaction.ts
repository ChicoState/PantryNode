import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional, InferAttributes } from 'sequelize';
import type { person, personId } from './person';
import type { site, siteId } from './site';
import type { trans_items, trans_itemsId } from './trans_items';

export interface transactionAttributes {
  trans_id: number;
  person_id?: number;
  date?: Date;
  trans_type?: "donation" | "purchase" | "throw out";
  site: number;
}

export type transactionPk = "trans_id";
export type transactionId = transaction[transactionPk];
export type transactionOptionalAttributes = "trans_id" | "person_id" | "trans_type";
export type transactionCreationAttributes = Optional<transactionAttributes, transactionOptionalAttributes>;

export class transaction extends Model<transactionAttributes, transactionCreationAttributes> implements transactionAttributes {
  trans_id!: number;
  person_id?: number;
  date?: Date;
  trans_type?: "donation" | "purchase" | "throw out";
  site!: number;

  // transaction belongsTo person via person_id
  person!: person;
  getPerson!: Sequelize.BelongsToGetAssociationMixin<person>;
  setPerson!: Sequelize.BelongsToSetAssociationMixin<person, personId>;
  createPerson!: Sequelize.BelongsToCreateAssociationMixin<person>;
  // transaction belongsTo site via site
  site_site!: site;
  getSite_site!: Sequelize.BelongsToGetAssociationMixin<site>;
  setSite_site!: Sequelize.BelongsToSetAssociationMixin<site, siteId>;
  createSite_site!: Sequelize.BelongsToCreateAssociationMixin<site>;
  // transaction hasMany trans_items via trans_id
  trans_items!: trans_items[];
  getTrans_items!: Sequelize.HasManyGetAssociationsMixin<trans_items>;
  setTrans_items!: Sequelize.HasManySetAssociationsMixin<trans_items, trans_itemsId>;
  addTrans_item!: Sequelize.HasManyAddAssociationMixin<trans_items, trans_itemsId>;
  addTrans_items!: Sequelize.HasManyAddAssociationsMixin<trans_items, trans_itemsId>;
  createTrans_item!: Sequelize.HasManyCreateAssociationMixin<trans_items, 'trans_id'>;
  removeTrans_item!: Sequelize.HasManyRemoveAssociationMixin<trans_items, trans_itemsId>;
  removeTrans_items!: Sequelize.HasManyRemoveAssociationsMixin<trans_items, trans_itemsId>;
  hasTrans_item!: Sequelize.HasManyHasAssociationMixin<trans_items, trans_itemsId>;
  hasTrans_items!: Sequelize.HasManyHasAssociationsMixin<trans_items, trans_itemsId>;
  countTrans_items!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof transaction {
    return transaction.init({
    trans_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    trans_type: {
      type: DataTypes.ENUM("donation","purchase","throw out"),
      allowNull: true
    },
    site: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site',
        key: 'site_id'
      }
    }
  }, {
    sequelize,
    tableName: 'transaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transaction_pkey",
        unique: true,
        fields: [
          { name: "trans_id" },
        ]
      },
    ]
  });
  }
}

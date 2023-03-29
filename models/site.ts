import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { address, addressId } from './address';
import type { aisle, aisleId } from './aisle';
import type { transaction, transactionId } from './transaction';

export interface siteAttributes {
  site_id: number;
  addr_id?: number;
  name: string;
}

export type sitePk = "site_id";
export type siteId = site[sitePk];
export type siteOptionalAttributes = "site_id" | "addr_id";
export type siteCreationAttributes = Optional<siteAttributes, siteOptionalAttributes>;

export class site extends Model<siteAttributes, siteCreationAttributes> implements siteAttributes {
  site_id!: number;
  addr_id?: number;
  name!: string;

  // site belongsTo address via addr_id
  addr!: address;
  getAddr!: Sequelize.BelongsToGetAssociationMixin<address>;
  setAddr!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createAddr!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // site hasMany aisle via site_id
  aisles!: aisle[];
  getAisles!: Sequelize.HasManyGetAssociationsMixin<aisle>;
  setAisles!: Sequelize.HasManySetAssociationsMixin<aisle, aisleId>;
  addAisle!: Sequelize.HasManyAddAssociationMixin<aisle, aisleId>;
  addAisles!: Sequelize.HasManyAddAssociationsMixin<aisle, aisleId>;
  createAisle!: Sequelize.HasManyCreateAssociationMixin<aisle>;
  removeAisle!: Sequelize.HasManyRemoveAssociationMixin<aisle, aisleId>;
  removeAisles!: Sequelize.HasManyRemoveAssociationsMixin<aisle, aisleId>;
  hasAisle!: Sequelize.HasManyHasAssociationMixin<aisle, aisleId>;
  hasAisles!: Sequelize.HasManyHasAssociationsMixin<aisle, aisleId>;
  countAisles!: Sequelize.HasManyCountAssociationsMixin;
  // site hasMany transaction via site
  transactions!: transaction[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<transaction>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<transaction, transactionId>;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<transaction, transactionId>;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<transaction, transactionId>;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<transaction>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<transaction, transactionId>;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<transaction, transactionId>;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<transaction, transactionId>;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<transaction, transactionId>;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof site {
    return site.init({
    site_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'addr_id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "site_pkey",
        unique: true,
        fields: [
          { name: "site_id" },
        ]
      },
    ]
  });
  }
}

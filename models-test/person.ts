import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { address, addressId } from './address';
import type { transaction, transactionId } from './transaction';

export interface personAttributes {
  person_id: number;
  fname: string;
  lname: string;
  password: string;
  email: string;
  phone?: number;
  pri_addr_id?: number;
  empl_id?: number;
}

export type personPk = "person_id";
export type personId = person[personPk];
export type personOptionalAttributes = "person_id" | "phone" | "pri_addr_id" | "empl_id";
export type personCreationAttributes = Optional<personAttributes, personOptionalAttributes>;

export class person extends Model<personAttributes, personCreationAttributes> implements personAttributes {
  person_id!: number;
  fname!: string;
  lname!: string;
  password!: string;
  email!: string;
  phone?: number;
  pri_addr_id?: number;
  empl_id?: number;

  // person belongsTo address via pri_addr_id
  pri_addr!: address;
  getPri_addr!: Sequelize.BelongsToGetAssociationMixin<address>;
  setPri_addr!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createPri_addr!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // person hasMany address via person_id
  addresses!: address[];
  getAddresses!: Sequelize.HasManyGetAssociationsMixin<address>;
  setAddresses!: Sequelize.HasManySetAssociationsMixin<address, addressId>;
  addAddress!: Sequelize.HasManyAddAssociationMixin<address, addressId>;
  addAddresses!: Sequelize.HasManyAddAssociationsMixin<address, addressId>;
  createAddress!: Sequelize.HasManyCreateAssociationMixin<address>;
  removeAddress!: Sequelize.HasManyRemoveAssociationMixin<address, addressId>;
  removeAddresses!: Sequelize.HasManyRemoveAssociationsMixin<address, addressId>;
  hasAddress!: Sequelize.HasManyHasAssociationMixin<address, addressId>;
  hasAddresses!: Sequelize.HasManyHasAssociationsMixin<address, addressId>;
  countAddresses!: Sequelize.HasManyCountAssociationsMixin;
  // person hasMany transaction via person_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof person {
    return person.init({
    person_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "person_email_key"
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pri_addr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'addr_id'
      }
    },
    empl_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'person',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "person_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "person_pkey",
        unique: true,
        fields: [
          { name: "person_id" },
        ]
      },
    ]
  });
  }
}

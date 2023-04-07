import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { person, personId } from './person';
import type { site, siteId } from './site';

export interface addressAttributes {
  person_id?: number;
  addr_id: number;
  addr_1: string;
  addr_2?: string;
  city: string;
  state: string;
  zip: number;
  country: string;
}

export type addressPk = "addr_id";
export type addressId = address[addressPk];
export type addressOptionalAttributes = "person_id" | "addr_id" | "addr_2";
export type addressCreationAttributes = Optional<addressAttributes, addressOptionalAttributes>;

export class address extends Model<addressAttributes, addressCreationAttributes> implements addressAttributes {
  person_id?: number;
  addr_id!: number;
  addr_1!: string;
  addr_2?: string;
  city!: string;
  state!: string;
  zip!: number;
  country!: string;

  // address hasMany person via pri_addr_id
  pri_addr_people!: person[];
  getPri_addr_people!: Sequelize.HasManyGetAssociationsMixin<person>;
  setPri_addr_people!: Sequelize.HasManySetAssociationsMixin<person, personId>;
  addPri_addr_person!: Sequelize.HasManyAddAssociationMixin<person, personId>;
  addPri_addr_people!: Sequelize.HasManyAddAssociationsMixin<person, personId>;
  createPri_addr_person!: Sequelize.HasManyCreateAssociationMixin<person>;
  removePri_addr_person!: Sequelize.HasManyRemoveAssociationMixin<person, personId>;
  removePri_addr_people!: Sequelize.HasManyRemoveAssociationsMixin<person, personId>;
  hasPri_addr_person!: Sequelize.HasManyHasAssociationMixin<person, personId>;
  hasPri_addr_people!: Sequelize.HasManyHasAssociationsMixin<person, personId>;
  countPri_addr_people!: Sequelize.HasManyCountAssociationsMixin;
  // address hasMany site via addr_id
  sites!: site[];
  getSites!: Sequelize.HasManyGetAssociationsMixin<site>;
  setSites!: Sequelize.HasManySetAssociationsMixin<site, siteId>;
  addSite!: Sequelize.HasManyAddAssociationMixin<site, siteId>;
  addSites!: Sequelize.HasManyAddAssociationsMixin<site, siteId>;
  createSite!: Sequelize.HasManyCreateAssociationMixin<site>;
  removeSite!: Sequelize.HasManyRemoveAssociationMixin<site, siteId>;
  removeSites!: Sequelize.HasManyRemoveAssociationsMixin<site, siteId>;
  hasSite!: Sequelize.HasManyHasAssociationMixin<site, siteId>;
  hasSites!: Sequelize.HasManyHasAssociationsMixin<site, siteId>;
  countSites!: Sequelize.HasManyCountAssociationsMixin;
  // address belongsTo person via person_id
  person!: person;
  getPerson!: Sequelize.BelongsToGetAssociationMixin<person>;
  setPerson!: Sequelize.BelongsToSetAssociationMixin<person, personId>;
  createPerson!: Sequelize.BelongsToCreateAssociationMixin<person>;

  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init({
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'person',
        key: 'person_id'
      }
    },
    addr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addr_1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    addr_2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "address_pkey",
        unique: true,
        fields: [
          { name: "addr_id" },
        ]
      },
    ]
  });
  }
}

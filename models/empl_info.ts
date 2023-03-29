import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { permissions, permissionsId } from './permissions';

export interface empl_infoAttributes {
  empl_id: number;
  perm_id: number;
  role?: "staff" | "manager" | "volunteer";
}

export type empl_infoPk = "empl_id";
export type empl_infoId = empl_info[empl_infoPk];
export type empl_infoOptionalAttributes = "empl_id" | "role";
export type empl_infoCreationAttributes = Optional<empl_infoAttributes, empl_infoOptionalAttributes>;

export class empl_info extends Model<empl_infoAttributes, empl_infoCreationAttributes> implements empl_infoAttributes {
  empl_id!: number;
  perm_id!: number;
  role?: "staff" | "manager" | "volunteer";

  // empl_info belongsTo permissions via perm_id
  perm!: permissions;
  getPerm!: Sequelize.BelongsToGetAssociationMixin<permissions>;
  setPerm!: Sequelize.BelongsToSetAssociationMixin<permissions, permissionsId>;
  createPerm!: Sequelize.BelongsToCreateAssociationMixin<permissions>;

  static initModel(sequelize: Sequelize.Sequelize): typeof empl_info {
    return empl_info.init({
    empl_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    perm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'perm_id'
      }
    },
    role: {
      type: DataTypes.ENUM("staff","manager","volunteer"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'empl_info',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empl_info_pkey",
        unique: true,
        fields: [
          { name: "empl_id" },
        ]
      },
    ]
  });
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { empl_info, empl_infoId } from './empl_info';

export interface permissionsAttributes {
  perm_id: number;
  perm_num?: number;
  description?: string;
}

export type permissionsPk = "perm_id";
export type permissionsId = permissions[permissionsPk];
export type permissionsOptionalAttributes = "perm_id" | "perm_num" | "description";
export type permissionsCreationAttributes = Optional<permissionsAttributes, permissionsOptionalAttributes>;

export class permissions extends Model<permissionsAttributes, permissionsCreationAttributes> implements permissionsAttributes {
  perm_id!: number;
  perm_num?: number;
  description?: string;

  // permissions hasMany empl_info via perm_id
  empl_infos!: empl_info[];
  getEmpl_infos!: Sequelize.HasManyGetAssociationsMixin<empl_info>;
  setEmpl_infos!: Sequelize.HasManySetAssociationsMixin<empl_info, empl_infoId>;
  addEmpl_info!: Sequelize.HasManyAddAssociationMixin<empl_info, empl_infoId>;
  addEmpl_infos!: Sequelize.HasManyAddAssociationsMixin<empl_info, empl_infoId>;
  createEmpl_info!: Sequelize.HasManyCreateAssociationMixin<empl_info>;
  removeEmpl_info!: Sequelize.HasManyRemoveAssociationMixin<empl_info, empl_infoId>;
  removeEmpl_infos!: Sequelize.HasManyRemoveAssociationsMixin<empl_info, empl_infoId>;
  hasEmpl_info!: Sequelize.HasManyHasAssociationMixin<empl_info, empl_infoId>;
  hasEmpl_infos!: Sequelize.HasManyHasAssociationsMixin<empl_info, empl_infoId>;
  countEmpl_infos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof permissions {
    return permissions.init({
    perm_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    perm_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'permissions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permissions_pkey",
        unique: true,
        fields: [
          { name: "perm_id" },
        ]
      },
    ]
  });
  }
}

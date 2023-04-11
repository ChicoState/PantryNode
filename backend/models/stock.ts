import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface stockAttributes {
    name?: string;
    category?: string;
    quantity?: number;
  }
  

export class stock extends Model<stockAttributes> {
  async refresh() {
    await this.sequelize.query("REFRESH MATERIALIZED VIEW stock;")
  }
    static initModel(sequelize: Sequelize.Sequelize): typeof stock {
      return stock.init({
            name:{
              type: DataTypes.STRING,
              primaryKey: true,
            },
            category: DataTypes.STRING,
            quantity: DataTypes.BIGINT,
        }, {
          sequelize,
          schema: 'public',
          tableName: 'stock',
          timestamps: false,
          freezeTableName: true,
          validate :{
            readOnly() {
              throw new Error('Stock model is read only');
            }
          }
        });
    }
  }
  
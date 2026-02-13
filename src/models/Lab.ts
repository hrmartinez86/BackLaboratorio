import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Lab extends Model {}

Lab.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Lab',
  }
);

export default Lab;
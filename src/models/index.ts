import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';
const envFile = process.env.NODE_ENV === 'development' 
  ? '.env.development' 
  : '.env';
  console.log('Using environment file:', envFile);
dotenv.config({ path: path.resolve(__dirname, '../..', envFile) });

// Usar variables de entorno para la conexión

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lab_database',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
  }
);

export default sequelize;
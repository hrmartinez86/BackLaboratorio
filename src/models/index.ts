import { Sequelize } from 'sequelize';

// Usar variables de entorno para la conexión
const sequelize = new Sequelize(
  process.env.DB_NAME || 'lab_database',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
  }
);

export default sequelize;
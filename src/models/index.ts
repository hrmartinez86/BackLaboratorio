import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lab_database', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
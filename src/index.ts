import express from 'express';
import { Sequelize } from 'sequelize';
import bodyParser from 'body-parser';
import Lab from './models/Lab';
import User from './models/User';
import Study from './models/Study';
import Test from './models/Test';
import Result from './models/Result';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
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

sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Sync models with the database
sequelize.sync({ force: false })
  .then(() => console.log('Database synced successfully.'))
  .catch((err) => console.error('Error syncing database:', err));

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
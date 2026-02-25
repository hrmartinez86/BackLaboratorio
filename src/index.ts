import express from 'express';
import bodyParser from 'body-parser';
import sequelize, { Lab, User, Study, Test, Result } from './models';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Initialize database
const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    console.log(`   Database: ${process.env.DB_NAME || 'lab_database'}`);

    // Sync all models - use force: true to recreate tables (temporary for debugging)
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database synced successfully. All tables created/updated.');
    console.log('   Tables: Users, Labs, Studies, Tests, Results');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
};

// Initialize and start server
initializeDatabase().then(() => {
  // Routes placeholder
  app.get('/', (req, res) => {
    res.send('API is running');
  });

  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
});
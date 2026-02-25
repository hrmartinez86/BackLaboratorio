import express from 'express';
import bodyParser from 'body-parser';
import sequelize, { Lab, User, Study, Test, Result } from './models';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  // Health check route
  app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📚 API Documentation:`);
    console.log(`   POST   /api/auth/login      - User login`);
    console.log(`   POST   /api/auth/register   - User registration`);
    console.log(`   GET    /api/auth/me         - Get current user (protected)`);
    console.log(`   POST   /api/users           - Create user`);
    console.log(`   GET    /api/users           - Get all users`);
    console.log(`   GET    /api/users/:id       - Get user by ID`);
    console.log(`   PUT    /api/users/:id       - Update user`);
    console.log(`   DELETE /api/users/:id       - Delete user`);
  });
});
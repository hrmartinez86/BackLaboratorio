import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas
router.post('/login', AuthController.login.bind(AuthController));           // POST /api/auth/login
router.post('/register', AuthController.register.bind(AuthController));     // POST /api/auth/register

// Rutas protegidas (requieren token)
router.get('/me', authMiddleware, AuthController.me.bind(AuthController));  // GET /api/auth/me

export default router;

import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// Rutas para usuarios
router.post('/', UserController.create.bind(UserController));           // POST /api/users - Crear
router.get('/', UserController.findAll.bind(UserController));           // GET /api/users - Obtener todos
router.get('/:id', UserController.findById.bind(UserController));       // GET /api/users/:id - Obtener por ID
router.put('/:id', UserController.update.bind(UserController));         // PUT /api/users/:id - Actualizar
router.delete('/:id', UserController.delete.bind(UserController));      // DELETE /api/users/:id - Eliminar

export default router;

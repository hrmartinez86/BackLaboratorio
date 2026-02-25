import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models';

class UserController {
  // POST - Crear nuevo usuario
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Validar datos requeridos
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email and password are required',
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Validar longitud de contraseña
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters',
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // Respuesta sin la contraseña
      const userResponse = user.toJSON();
      delete (userResponse as any).password;

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: userResponse,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // GET - Obtener todos los usuarios
  async findAll(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // GET - Obtener usuario por ID
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // PUT - Actualizar usuario
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Verificar si el email ya existe (si es diferente al actual)
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Email already registered',
          });
        }
      }

      // Actualizar usuario
      if (name) user.name = name;
      if (email) user.email = email;

      await user.save();

      const userResponse = user.toJSON();
      delete (userResponse as any).password;

      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: userResponse,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // DELETE - Eliminar usuario
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      await user.destroy();

      return res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new UserController();
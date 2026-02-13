import { Request, Response } from 'express';
import Lab from '../models/Lab';

export const getAllLabs = async (req: Request, res: Response) => {
  try {
    const labs = await Lab.findAll();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch labs' });
  }
};

export const createLab = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    const newLab = await Lab.create({ name, location });
    res.status(201).json(newLab);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lab' });
  }
};
import { Request, Response } from 'express';
import Study from '../models/Study';

export const getAllStudies = async (req: Request, res: Response) => {
  try {
    const studies = await Study.findAll();
    res.json(studies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch studies' });
  }
};

export const createStudy = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newStudy = await Study.create({ title, description });
    res.status(201).json(newStudy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create study' });
  }
};
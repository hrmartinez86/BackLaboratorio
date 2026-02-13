import { Request, Response } from 'express';
import Result from '../models/Result';

export const getAllResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

export const createResult = async (req: Request, res: Response) => {
  try {
    const { testId, value } = req.body;
    const newResult = await Result.create({ testId, value });
    res.status(201).json(newResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create result' });
  }
};
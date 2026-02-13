import { Request, Response } from 'express';
import Test from '../models/Test';

export const getAllTests = async (req: Request, res: Response) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
};

export const createTest = async (req: Request, res: Response) => {
  try {
    const { name, studyId } = req.body;
    const newTest = await Test.create({ name, studyId });
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test' });
  }
};
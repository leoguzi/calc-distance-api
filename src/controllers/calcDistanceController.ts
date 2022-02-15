import { Request, Response } from 'express';

async function findAddresses(rec: Request, res: Response) {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { findAddresses };

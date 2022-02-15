import { Request, Response } from 'express';

async function findAddresses(rec: Request, res: Response) {
  res.sendStatus(200);
}

export { findAddresses };

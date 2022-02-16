import { Address } from 'cluster';
import { NextFunction, Request, Response } from 'express';
import * as calcDistanceService from '../services/calcDistanceService';

async function findAddresses(req: Request, res: Response, next: NextFunction) {
  const addresses = req.body;

  try {
    await calcDistanceService.getAddresses(addresses);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export { findAddresses };

import { Address } from 'cluster';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as calcDistanceService from '../services/calcDistanceService';

async function findAddresses(req: Request, res: Response, next: NextFunction) {
  const addresses = req.body;

  try {
    const response = await calcDistanceService.getDistances(addresses);
    res.send(response).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export { findAddresses };

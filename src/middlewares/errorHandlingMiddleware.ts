import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import InvalidDataError from '../errors/InvalidData';

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
    });
  }

  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import InvalidDataError from '../errors/InvalidData';
import AddressNotFoundError from '../errors/AddressNotFound';

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
    });
  }

  if (err.name === 'AddressNotFound') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}

import { Router } from 'express';
import * as findAddressesController from '../controllers/calcDistanceController';
import schemaValidatingMiddleware from '../middlewares/schemaValidatingMiddleware';
import addressesSchema from '../schemas/addressesSchema';

const findAddressesRouter = Router();

findAddressesRouter.post(
  '/addresses',
  schemaValidatingMiddleware(addressesSchema),
  findAddressesController.findAddresses
);

export default findAddressesRouter;

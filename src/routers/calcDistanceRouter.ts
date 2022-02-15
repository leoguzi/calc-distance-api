import { Router } from 'express';
import * as findAddressesController from '../controllers/calcDistanceController';

const findAddressesRouter = Router();

findAddressesRouter.post('/addresses', findAddressesController.findAddresses);

export default findAddressesRouter;

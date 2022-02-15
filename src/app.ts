import express from 'express';
import cors from 'cors';

import findAddressesRouter from './routers/calcDistanceRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', findAddressesRouter);

export default app;

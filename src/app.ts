import express from 'express';
import cors from 'cors';

import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';

import findAddressesRouter from './routers/calcDistancesRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send('OK!');
});

app.use('/', findAddressesRouter);

app.use(errorHandlingMiddleware);

export default app;

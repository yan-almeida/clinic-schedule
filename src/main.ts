import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import expressPino from 'express-pino-logger';
import logger from './loggers/app.logger';
import './utils/module-alias.util';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(bodyParser.json());
app.use(
  expressPino({
    logger,
  }),
);
app.use(
  cors({
    origin: '*',
  }),
);
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});

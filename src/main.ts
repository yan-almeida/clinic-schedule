import dotenv from 'dotenv';
import express, { Express } from 'express';
import './utils/module-alias.util';

import { BootstrapApp, ExitStatus } from '@app/bootstrap.app';
import { Logger } from '@utils/logger';
import config from 'config';

dotenv.config();

process.on('unhandledRejection', (reason, promise) => {
  const logger = new Logger('unhandledRejection');

  logger.error(
    `App exiting due to an unhandled promise: ${JSON.stringify(
      promise,
    )} and reason: ${reason}`,
  );

  throw reason;
});

process.on('uncaughtException', (error) => {
  const logger = new Logger('uncaughtException');

  logger.error(`App exiting due to an uncaught exception: ${error}`);

  process.exit(ExitStatus.Failure);
});

const main = async (): Promise<void> => {
  const logger = new Logger(main.name);

  try {
    const app: Express = express();
    const port = config.get<number>('app.port');

    const server = new BootstrapApp(app, port);

    await server.init();
    server.start();
    server.safeExit();
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
};

main();

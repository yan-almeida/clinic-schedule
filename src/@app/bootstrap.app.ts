import { ControllerErrorValidator } from '@app/adapters/presentation/controllers/controller-error.validator';
import attendanceRuleRouter from '@app/modules/attendance-rule/factories/register-controller.factory';
import { Logger } from '@core/utils/logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Express } from 'express';
import * as expressWinston from 'express-winston';
import * as http from 'http';

export enum ExitStatus {
  Failure = 1,
  Success = 0,
}

export class BootstrapApp {
  #server?: http.Server;
  #logger = new Logger(BootstrapApp.name);

  constructor(private readonly app: Express, private readonly port: number) {}

  async init(): Promise<void> {
    this.#setupExpress();
    this.#setupControllers();

    this.#setupErrorHandlers(); // always last!
  }

  #setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressWinston.logger({
        requestWhitelist: [
          ...expressWinston.requestWhitelist,
          'body',
          'session',
          'currentContext',
        ],
        bodyBlacklist: ['password'],
        responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
        winstonInstance: this.#logger.winston.child({
          label: 'http-rest',
        }),
      }),
    );

    this.app.use(
      cors({
        origin: '*',
      }),
    );
  }

  #setupControllers(): void {
    this.app.use('/attendance-rules', attendanceRuleRouter);
  }

  #setupErrorHandlers(): void {
    this.app.use(ControllerErrorValidator);
  }

  async close(): Promise<void> {
    if (this.#server) {
      await new Promise((resolve, reject) => {
        this.#server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  start(): void {
    this.#server = this.app.listen(this.port, () => {
      this.#logger.info(`Server is running at http://localhost:${this.port}`);
    });
  }

  safeExit(): void {
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await this.close();

          this.#logger.info(`App exited with success`);

          process.exit(ExitStatus.Success);
        } catch (error) {
          this.#logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  }
}

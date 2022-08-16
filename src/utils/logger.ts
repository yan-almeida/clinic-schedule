const colors = require('colors');
import * as winston from 'winston';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = (ctx: string) => {
  return winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;

      return `${colors.magenta(
        `[${ctx}]`,
      )} ${timestamp} [${level}]: ${message}  ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    }),
  );
};

const isDevEnvironment = () => process.env.NODE_ENV !== 'production';

export class Logger {
  private logger: winston.Logger;

  constructor(context: string) {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });

    const transport = new winston.transports.Console({
      format: formatter(context),
    });

    this.logger = winston.createLogger({
      level: isDevEnvironment() ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [isDevEnvironment() ? transport : prodTransport],
    });
    winston.addColors(customLevels.colors);
  }

  get winston() {
    return this.logger;
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

import config from 'config';
import pino from 'pino';

export default pino({
  enabled: config.get('logger.enabled'),
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

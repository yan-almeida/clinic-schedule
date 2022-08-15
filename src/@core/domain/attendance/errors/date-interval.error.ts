import { InternalError } from '@core/common/errors/internal.error';

export class DateIntervalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during create a new interval: ${message}`);
  }
}

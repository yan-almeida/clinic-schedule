import { InternalError } from '@core/common/errors/internal.error';

export class DateCannotBeforeToday extends InternalError {
  constructor(message: string) {
    super(
      `Unexpected error during create a new attendance in specific date: ${message}`,
    );
  }
}

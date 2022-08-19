import { InternalError } from '@core/common/errors/internal.error';

export class NonSpecificTypeOfAttendance extends InternalError {
  constructor(message: string) {
    super(
      `Unexpected error during create a new attendance instance: ${message}`,
    );
  }
}

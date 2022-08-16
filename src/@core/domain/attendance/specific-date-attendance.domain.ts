import { Attendance } from '@core/domain/attendance/attendance.domain';
import { DateCannotBeforeToday } from '@core/domain/attendance/errors/date-cannot-before-today.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { isBefore } from 'date-fns';

export class SpecificDateAttendance extends Attendance {
  #date: Date;

  constructor(date: Date, interval: Interval) {
    super(AttendanceType.SPECIFIC_DATE, interval);

    this.#date = date;
  }

  get date(): Date {
    return this.#date;
  }

  static from(date: Date, interval: Interval): SpecificDateAttendance {
    if (isBefore(date, new Date())) {
      throw new DateCannotBeforeToday(
        'the appointment day cannot be before today',
      );
    }

    return new SpecificDateAttendance(date, interval);
  }
}

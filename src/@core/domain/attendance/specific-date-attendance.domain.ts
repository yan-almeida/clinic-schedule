import { isBefore } from 'date-fns';
import { AttendanceType } from './attendance-type.enum';
import { Attendance } from './attendance.domain';
import { DateCannotBeforeToday } from './errors/date-cannot-before-today.error';
import { Interval } from './interval.domain';

export class SpecificDateAttendance extends Attendance {
  #date: Date;

  constructor(date: Date, interval: Interval) {
    super(AttendanceType.SPECIFIC_DAY, interval);

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

import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { Attendance } from '@core/domain/attendance/attendance.domain';
import { DateCannotBeforeToday } from '@core/domain/attendance/errors/date-cannot-before-today.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { format, isBefore } from 'date-fns';

export class SpecificDateAttendance extends Attendance {
  date: Date;

  constructor(date: Date, interval: Interval) {
    super(AttendanceType.SPECIFIC_DATE, interval);

    this.date = date;
  }

  static from(date: Date, interval: Interval): SpecificDateAttendance {
    if (isBefore(date, new Date())) {
      throw new DateCannotBeforeToday(
        'the appointment day cannot be before today',
      );
    }

    return new SpecificDateAttendance(date, interval);
  }

  asAttendanceDay(day: Date): AttendanceDay | undefined {
    const actualDay = format(day, 'MM-dd-yyyy');
    const specificDate = format(this.date, 'MM-dd-yyyy');

    if (actualDay !== specificDate) {
      return;
    }

    return {
      day: format(day, 'MM-dd-yyyy'),
      interval: this.interval,
    };
  }
}

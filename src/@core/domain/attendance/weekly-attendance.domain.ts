import { Attendance } from '@core/domain/attendance/attendance.domain';
import { WithoutDayOfWeek } from '@core/domain/attendance/errors/whitout-day-of-week.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';

export class WeeklyAttendance extends Attendance {
  daysOfWeek: DaysOfWeek[];

  constructor(daysOfWeek: DaysOfWeek[], interval: Interval) {
    super(AttendanceType.WEEKLY, interval);

    this.daysOfWeek = daysOfWeek;
  }

  static from(daysOfWeek: DaysOfWeek[], interval: Interval): WeeklyAttendance {
    if (!daysOfWeek.length) {
      throw new WithoutDayOfWeek(
        'It is not possible to schedule an appointment without a day a week',
      );
    }

    return new WeeklyAttendance(daysOfWeek, interval);
  }
}

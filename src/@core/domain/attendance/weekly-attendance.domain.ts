import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { Attendance } from '@core/domain/attendance/attendance.domain';
import { WithoutDayOfWeek } from '@core/domain/attendance/errors/whitout-day-of-week.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { format } from 'date-fns';

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

  asAttendanceDay(day: Date): AttendanceDay | undefined {
    const dayOfweek = day.getDay();

    if (!this.daysOfWeek.includes(dayOfweek)) {
      return;
    }

    return {
      day: format(day, 'MM-dd-yyyy'),
      interval: this.interval,
    };
  }
}

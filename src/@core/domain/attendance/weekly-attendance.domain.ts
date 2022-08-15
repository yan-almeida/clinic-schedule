import { DaysOfWeek } from '@core/domain/attendance/days-of-week.enum';
import { WithoutDayOfWeek } from '@core/domain/attendance/errors/whitout-day-of-week.error';
import { AttendanceType } from './attendance-type.enum';
import { Attendance } from './attendance.domain';
import { Interval } from './interval.domain';

export class WeeklyAttendance extends Attendance {
  #daysOfWeek: DaysOfWeek[];

  constructor(daysOfWeek: DaysOfWeek[], interval: Interval) {
    super(AttendanceType.WEEKLY, interval);

    this.#daysOfWeek = daysOfWeek;
  }

  get daysOfWeek(): DaysOfWeek[] {
    return this.#daysOfWeek;
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

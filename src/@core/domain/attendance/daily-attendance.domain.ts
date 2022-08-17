import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { format } from 'date-fns';

export class DailyAttendance extends Attendance {
  constructor(interval: Interval) {
    super(AttendanceType.DAILY, interval);
  }

  static from(interval: Interval): DailyAttendance {
    return new DailyAttendance(interval);
  }

  asAttendanceDay(day: Date): AttendanceDay {
    return {
      day: format(day, 'MM-dd-yyyy'),
      interval: this.interval,
    };
  }
}

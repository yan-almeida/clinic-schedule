import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';

export class DailyAttendance extends Attendance {
  constructor(interval: Interval) {
    super(AttendanceType.DAILY, interval);
  }

  static from(interval: Interval): DailyAttendance {
    return new DailyAttendance(interval);
  }
}

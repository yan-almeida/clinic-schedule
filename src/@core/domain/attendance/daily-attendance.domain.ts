import { AttendanceType } from './attendance-type.enum';
import { Attendance } from './attendance.domain';
import { Interval } from './interval.domain';

export class SpecificDayAttendance extends Attendance {
  constructor(interval: Interval) {
    super(AttendanceType.DAILY, interval);
  }

  static from(interval: Interval): SpecificDayAttendance {
    return new SpecificDayAttendance(interval);
  }
}

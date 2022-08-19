import { AttendanceRule } from '@core/domain/attendance/attendance-rule.domain';
import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { NonSpecificTypeOfAttendance } from '@core/domain/attendance/errors/non-specific-type.error';
import { AttendanceStrategy } from '@core/domain/attendance/factories/attendance.factory';
import { isAnDailyAttendance } from '@core/domain/attendance/validators/attendance.validator';

export class CreateDailyAttendance implements AttendanceStrategy {
  create(attendanceRule: AttendanceRule): DailyAttendance {
    if (!isAnDailyAttendance(attendanceRule)) {
      throw new NonSpecificTypeOfAttendance('is not an daily attendance');
    }

    const { interval } = attendanceRule;

    return DailyAttendance.from(interval);
  }
}

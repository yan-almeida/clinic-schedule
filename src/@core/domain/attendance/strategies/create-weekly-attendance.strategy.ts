import { AttendanceRule } from '@core/domain/attendance/attendance-rule.domain';
import { NonSpecificTypeOfAttendance } from '@core/domain/attendance/errors/non-specific-type.error';
import { AttendanceStrategy } from '@core/domain/attendance/factories/attendance.factory';
import { isAnWeeklyAttendance } from '@core/domain/attendance/validators/attendance.validator';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';

export class CreateWeeklyAttendance implements AttendanceStrategy {
  create(attendanceRule: AttendanceRule): WeeklyAttendance {
    if (!isAnWeeklyAttendance(attendanceRule)) {
      throw new NonSpecificTypeOfAttendance('is not an weekly attendance');
    }

    const { interval, daysOfWeek } = attendanceRule;

    return WeeklyAttendance.from(daysOfWeek, interval);
  }
}

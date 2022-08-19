import { AttendanceRule } from '@core/domain/attendance/attendance-rule.domain';
import { NonSpecificTypeOfAttendance } from '@core/domain/attendance/errors/non-specific-type.error';
import { AttendanceStrategy } from '@core/domain/attendance/factories/attendance.factory';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { isAnSpecificDateAttendance } from '@core/domain/attendance/validators/attendance.validator';

export class CreateSpecificAttendance implements AttendanceStrategy {
  create(attendanceRule: AttendanceRule): SpecificDateAttendance {
    if (!isAnSpecificDateAttendance(attendanceRule)) {
      throw new NonSpecificTypeOfAttendance(
        'is not an specific date attendance',
      );
    }

    const { date, interval } = attendanceRule;

    return SpecificDateAttendance.from(new Date(date ?? ''), interval);
  }
}

import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';
import { CreateAttendanceStrategy } from '@infra/db/create-attendance.factory';
import {
  CreateAttendanceRule,
  isAnWeeklyAttendance,
} from '@infra/db/interfaces';

export class CreateWeeklyAttendance implements CreateAttendanceStrategy {
  create(createAttendanceRule: CreateAttendanceRule): WeeklyAttendance {
    if (!isAnWeeklyAttendance(createAttendanceRule)) {
      throw new Error('is not an weekly attendance');
    }

    const { interval, daysOfWeek } = createAttendanceRule;

    return WeeklyAttendance.from(daysOfWeek, interval);
  }
}

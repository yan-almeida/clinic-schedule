import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';
import {
  CreateAttendanceRule,
  CreateAttendanceStrategy,
} from '@infra/db/create-attendance.factory';

export class CreateWeeklyAttendance implements CreateAttendanceStrategy {
  async create(
    createAttendanceRule: CreateAttendanceRule,
  ): Promise<WeeklyAttendance> {
    const { interval, daysOfWeek } = createAttendanceRule;

    return WeeklyAttendance.from(daysOfWeek, interval);
  }
}

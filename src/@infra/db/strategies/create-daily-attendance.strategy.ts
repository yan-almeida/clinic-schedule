import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import {
  CreateAttendanceRule,
  CreateAttendanceStrategy,
} from '@infra/db/create-attendance.factory';

export class CreateDailyAttendance implements CreateAttendanceStrategy {
  async create(
    createAttendanceRule: CreateAttendanceRule,
  ): Promise<DailyAttendance> {
    const { interval } = createAttendanceRule;

    return DailyAttendance.from(interval);
  }
}

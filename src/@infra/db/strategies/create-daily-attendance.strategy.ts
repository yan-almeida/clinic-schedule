import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { CreateAttendanceStrategy } from '@infra/db/create-attendance.factory';
import {
  CreateAttendanceRule,
  isAnDailyAttendance,
} from '@infra/db/interfaces';

export class CreateDailyAttendance implements CreateAttendanceStrategy {
  create(createAttendanceRule: CreateAttendanceRule): DailyAttendance {
    if (!isAnDailyAttendance(createAttendanceRule)) {
      throw new Error('is not an daily attendance');
    }

    const { interval } = createAttendanceRule;

    return DailyAttendance.from(interval);
  }
}

import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import {
  CreateAttendanceRule,
  CreateAttendanceStrategy,
} from '@infra/db/create-attendance.factory';

export class CreateSpecificAttendance implements CreateAttendanceStrategy {
  async create(
    createAttendanceRule: CreateAttendanceRule,
  ): Promise<SpecificDateAttendance> {
    const { date, interval } = createAttendanceRule;

    return SpecificDateAttendance.from(new Date(date ?? ''), interval);
  }
}

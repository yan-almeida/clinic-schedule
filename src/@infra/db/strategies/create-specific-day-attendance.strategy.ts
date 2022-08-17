import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { CreateAttendanceStrategy } from '@infra/db/create-attendance.factory';
import {
  CreateAttendanceRule,
  isAnSpecificDateAttendance,
} from '@infra/db/interfaces';

export class CreateSpecificAttendance implements CreateAttendanceStrategy {
  create(createAttendanceRule: CreateAttendanceRule): SpecificDateAttendance {
    if (!isAnSpecificDateAttendance(createAttendanceRule)) {
      throw new Error('is not an specific date attendance');
    }

    const { date, interval } = createAttendanceRule;

    return SpecificDateAttendance.from(new Date(date ?? ''), interval);
  }
}

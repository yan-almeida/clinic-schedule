import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { LocalAttendanceRepository } from '@infra/db/attendance.repository';
import {
  CreateAttendanceRule,
  CreateAttendanceStrategy,
} from '@infra/db/create-attendance.factory';

export class CreateSpecificAttendance implements CreateAttendanceStrategy {
  constructor(
    private readonly localAttendanceRepository: LocalAttendanceRepository,
  ) {}

  async create(
    createAttendanceRule: CreateAttendanceRule,
  ): Promise<SpecificDateAttendance> {
    const { date, interval } = createAttendanceRule;

    const specificDateAttendance = SpecificDateAttendance.from(
      new Date(date ?? ''),
      interval,
    );

    await this.localAttendanceRepository.insert(specificDateAttendance);

    return specificDateAttendance;
  }
}

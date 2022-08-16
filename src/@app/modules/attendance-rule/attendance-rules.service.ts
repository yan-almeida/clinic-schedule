import { CreateAttendanceRuleDto } from '@app/modules/attendance-rule/dtos/create-attendance-rule.dto';
import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { Interval } from '@core/domain/attendance/interval.domain';
import { AttendanceRepository } from '@core/domain/attendance/repositories/attendance.repository';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';
import { CreateAttendanceFactory } from '@infra/db/create-attendance.factory';

export class AttendanceRulesService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository<
      SpecificDateAttendance | DailyAttendance | WeeklyAttendance
    >,
  ) {}

  async create(dto: CreateAttendanceRuleDto): Promise<string> {
    const { start, end, type, date, daysOfWeek } = dto;

    const interval = Interval.from(new Date(start), new Date(end));

    const createAttendanceFactory = new CreateAttendanceFactory();
    const createAttendanceStrategy = createAttendanceFactory.build(type);

    const createdAttendance = await createAttendanceStrategy.create({
      interval,
      date,
      daysOfWeek,
    });

    await this.attendanceRepository.insert(createdAttendance);

    return createdAttendance.id;
  }

  findAll() {
    return;
  }
}

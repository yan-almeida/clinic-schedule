import { AvailableTimeDto } from '@app/modules/attendance-rule/dtos/available-time.dto';
import { CreateAttendanceRuleDto } from '@app/modules/attendance-rule/dtos/create-attendance-rule.dto';
import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { Attendance } from '@core/domain/attendance/attendance.domain';
import { Interval } from '@core/domain/attendance/interval.domain';
import { AttendanceRepository } from '@core/domain/attendance/repositories/attendance.repository';
import { CreateAttendanceFactory } from '@infra/db/create-attendance.factory';
import { eachDayOfInterval } from 'date-fns';
import { groupBy } from 'ramda';

export class AttendanceRulesService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async create(dto: CreateAttendanceRuleDto): Promise<string> {
    const { start, end, type, date, daysOfWeek } = dto;

    const interval = Interval.from(start, end);

    const createAttendanceFactory = new CreateAttendanceFactory();
    const createAttendanceStrategy = createAttendanceFactory.build(type);

    const attendance = createAttendanceStrategy.create({
      type,
      interval,
      date,
      daysOfWeek,
    });

    await this.attendanceRepository.insert(attendance);

    return attendance.id;
  }

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    await this.attendanceRepository.delete(id);
  }

  async findAvailableTimes(from: Date, to: Date): Promise<AvailableTimeDto[]> {
    const attendances = await this.attendanceRepository.findAll();

    const dates = eachDayOfInterval({
      start: from,
      end: to,
    });

    const createAttendanceFactory = new CreateAttendanceFactory();

    const availableTimes = new Set<AttendanceDay>();

    for (const date of dates) {
      for (const attendance of attendances) {
        const hydratedAttendance = createAttendanceFactory.build(
          attendance.type,
        );

        const asAttendanceDay = hydratedAttendance
          .create(attendance)
          .asAttendanceDay(date);

        if (asAttendanceDay && !availableTimes.has(asAttendanceDay)) {
          availableTimes.add(asAttendanceDay);
        }
      }
    }
    const groupedAttendances = groupBy(
      (attendance) => attendance.day,
      Array.from(availableTimes.values()),
    );

    return this.#groupAttendancesRulesPerDay(groupedAttendances);
  }

  #groupAttendancesRulesPerDay(
    groupedAttendances: Record<string, AttendanceDay[]>,
  ): AvailableTimeDto[] {
    const groupedEntriesAttendances = Object.entries(groupedAttendances);

    return groupedEntriesAttendances.map(([day, attendances]) =>
      AvailableTimeDto.from(day, attendances),
    );
  }
}

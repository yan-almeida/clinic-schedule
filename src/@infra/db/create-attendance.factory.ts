import { CreateSpecificAttendance } from '@app/modules/attendance-rule/strategies/create-specific-day-attendance.strategy';
import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';
import { LocalAttendanceRepository } from '@infra/db/attendance.repository';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export interface CreateAttendanceRule {
  interval: Interval;
  daysOfWeek?: Array<DaysOfWeek>;
  date?: Date;
}

export interface CreateAttendanceStrategy {
  create(
    createAttendanceRule: CreateAttendanceRule,
  ): Promise<SpecificDateAttendance | DailyAttendance | WeeklyAttendance>;
}

export type AttendanceFactory = Record<
  AttendanceType,
  Type<CreateAttendanceStrategy>
>;

const localAttendanceRepository = new LocalAttendanceRepository();

export class CreateAttendanceFactory {
  #attendanceFactory: AttendanceFactory = {
    daily: CreateSpecificAttendance,
    specificDate: CreateSpecificAttendance,
    weekly: CreateSpecificAttendance,
  };

  build(attendanceType: AttendanceType) {
    const attendanceStrategy = this.#attendanceFactory[attendanceType];

    if (!attendanceStrategy) {
      throw new Error('Strategy not found!');
    }

    return new attendanceStrategy(localAttendanceRepository);
  }
}

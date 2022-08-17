import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { CreateAttendanceRule } from '@infra/db/interfaces';
import { CreateDailyAttendance } from '@infra/db/strategies/create-daily-attendance.strategy';
import { CreateSpecificAttendance } from '@infra/db/strategies/create-specific-day-attendance.strategy';
import { CreateWeeklyAttendance } from '@infra/db/strategies/create-weekly-attendance.strategy';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export interface CreateAttendanceStrategy {
  create<Att extends CreateAttendanceRule>(
    createAttendanceRule: Att,
  ): Attendance;
}

export type AttendanceFactory = Record<
  AttendanceType,
  Type<CreateAttendanceStrategy>
>;

export class CreateAttendanceFactory {
  #attendanceFactory: AttendanceFactory = {
    daily: CreateDailyAttendance,
    specificDate: CreateSpecificAttendance,
    weekly: CreateWeeklyAttendance,
  };

  build(attendanceType: AttendanceType) {
    const AttendanceStrategy = this.#attendanceFactory[attendanceType];

    if (!AttendanceStrategy) {
      throw new Error('Strategy not found!');
    }

    return new AttendanceStrategy();
  }
}

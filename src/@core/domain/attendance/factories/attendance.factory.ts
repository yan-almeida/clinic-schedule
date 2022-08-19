import { AttendanceRule } from '@core/domain/attendance/attendance-rule.domain';
import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { CreateDailyAttendance } from '@core/domain/attendance/strategies/create-daily-attendance.strategy';
import { CreateSpecificAttendance } from '@core/domain/attendance/strategies/create-specific-day-attendance.strategy';
import { CreateWeeklyAttendance } from '@core/domain/attendance/strategies/create-weekly-attendance.strategy';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export interface AttendanceStrategy {
  create<Att extends AttendanceRule>(createAttendanceRule: Att): Attendance;
}

export class AttendanceFactory {
  #attendanceFactory: Record<AttendanceType, Type<AttendanceStrategy>> = {
    daily: CreateDailyAttendance,
    specificDate: CreateSpecificAttendance,
    weekly: CreateWeeklyAttendance,
  };

  build(attendanceType: AttendanceType): AttendanceStrategy {
    const AttendanceStrategy = this.#attendanceFactory[attendanceType];

    if (!AttendanceStrategy) {
      throw new Error('Strategy not found!');
    }

    return new AttendanceStrategy();
  }
}

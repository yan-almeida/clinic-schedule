import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';

export interface AttendanceRule {
  type: AttendanceType;
  interval: Interval;
}

export interface WeeklyAttendanceRule extends AttendanceRule {
  daysOfWeek: DaysOfWeek[];
}

export interface SpecificDateAttendanceRule extends AttendanceRule {
  date: Date;
}

export type DailyAttendanceRule = AttendanceRule;

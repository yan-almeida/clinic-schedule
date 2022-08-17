import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';

export interface CreateAttendanceRule {
  type: AttendanceType;
  interval: Interval;
}

export interface CreateWeeklyAttendanceRule extends CreateAttendanceRule {
  daysOfWeek: DaysOfWeek[];
}

export interface CreateSpecificDateAttendanceRule extends CreateAttendanceRule {
  date: Date;
}

export type CreateDailyAttendanceRule = CreateAttendanceRule;

export const isAnSpecificDateAttendance = (
  obj: CreateAttendanceRule,
): obj is CreateSpecificDateAttendanceRule => {
  return obj.type === AttendanceType.SPECIFIC_DATE;
};

export const isAnDailyAttendance = (
  obj: CreateAttendanceRule,
): obj is CreateDailyAttendanceRule => {
  return obj.type === AttendanceType.DAILY;
};

export const isAnWeeklyAttendance = (
  obj: CreateAttendanceRule,
): obj is CreateWeeklyAttendanceRule => {
  return obj.type === AttendanceType.WEEKLY;
};

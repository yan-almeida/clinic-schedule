import {
  AttendanceRule,
  DailyAttendanceRule,
  SpecificDateAttendanceRule,
  WeeklyAttendanceRule,
} from '@core/domain/attendance/attendance-rule.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';

export const isAnSpecificDateAttendance = (
  obj: AttendanceRule,
): obj is SpecificDateAttendanceRule => {
  return obj.type === AttendanceType.SPECIFIC_DATE;
};

export const isAnDailyAttendance = (
  obj: AttendanceRule,
): obj is DailyAttendanceRule => {
  return obj.type === AttendanceType.DAILY;
};

export const isAnWeeklyAttendance = (
  obj: AttendanceRule,
): obj is WeeklyAttendanceRule => {
  return obj.type === AttendanceType.WEEKLY;
};

import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';

export interface CreateAttendanceRuleDto {
  start: string;
  end: string;
  type: AttendanceType;
  daysOfWeek: [DaysOfWeek];
  date?: Date;
}

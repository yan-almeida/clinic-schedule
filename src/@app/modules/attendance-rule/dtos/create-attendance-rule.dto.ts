import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';

export interface CreateAttendanceRuleDto {
  start: Date;
  end: Date;
  type: AttendanceType;
  daysOfWeek?: Array<DaysOfWeek>;
  date?: Date;
}

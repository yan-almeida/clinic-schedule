import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';

export class AttendanceRuleDto {
  id: string;
  interval: Interval;
  type: AttendanceType;
  daysOfWeek?: Array<DaysOfWeek>;
  date?: Date;

  constructor(
    id: string,
    interval: Interval,
    type: AttendanceType,
    daysOfWeek?: Array<DaysOfWeek>,
    date?: Date,
  ) {
    this.id = id;
    this.interval = interval;
    this.type = type;
    this.daysOfWeek = daysOfWeek;
    this.date = date;
  }
}

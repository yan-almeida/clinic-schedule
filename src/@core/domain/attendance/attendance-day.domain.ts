import { Interval } from '@core/domain/attendance/interval.domain';

type DateString = string;

export interface AttendanceDay {
  day: DateString;
  interval: Interval;
}

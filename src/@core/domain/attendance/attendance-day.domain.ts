import { Interval } from '@core/domain/attendance/interval.domain';

export interface AttendanceDay {
  day: string;
  interval: Interval;
}

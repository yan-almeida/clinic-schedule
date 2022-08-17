import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { Interval } from '@core/domain/attendance/interval.domain';

export class AvailableTimeDto {
  day: string;

  intervals: Interval[];

  protected constructor(day: string, intervals: Interval[]) {
    this.day = day;
    this.intervals = intervals;
  }

  static from(day: string, attendances: AttendanceDay[]) {
    const intervals = attendances.map((attendance) => attendance.interval);

    return new AvailableTimeDto(day, intervals);
  }
}

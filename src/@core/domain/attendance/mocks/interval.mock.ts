import { Interval } from '@core/domain/attendance/interval.domain';

export class IntervalMock {
  static validInterval(): Interval {
    return Interval.from('15:30', '16:30');
  }
}

import { Interval } from '@core/domain/attendance/interval.domain';

export class IntervalMock {
  static validInterval(): Interval {
    const startDate = new Date('2022-08-12');
    startDate.setUTCHours(15, 30, 0, 0);

    const endDate = new Date('2022-08-12');
    endDate.setUTCHours(16, 30, 0, 0);

    return Interval.from(startDate, endDate);
  }

  static invalidInterval(): Interval {
    const startDate = new Date('2022-08-12');
    startDate.setHours(16, 30, 0, 0);

    const endDate = new Date('2022-08-12');
    endDate.setHours(15, 30, 0, 0);

    return Interval.from(startDate, endDate);
  }
}

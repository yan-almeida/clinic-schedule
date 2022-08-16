import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';

describe('Internal', () => {
  it('should create an interval', () => {
    const interval = IntervalMock.validInterval();

    expect(interval.start).toEqual('15:30');
    expect(interval.end).toEqual('16:30');
  });
});

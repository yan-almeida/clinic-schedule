import { DateIntervalError } from '@core/domain/attendance/errors/date-interval.error';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';

describe('Internal', () => {
  it('should create an interval', () => {
    const interval = IntervalMock.validInterval();

    expect(interval.start).toEqual(new Date('2022-08-12T15:30:00.000Z'));
    expect(interval.end).toEqual(new Date('2022-08-12T16:30:00.000Z'));
  });

  it('should throws when try to create an interval with wrong interval', async () => {
    try {
      IntervalMock.invalidInterval();
    } catch (error) {
      expect(error).toBeInstanceOf(DateIntervalError);
      expect(error).toEqual(
        new DateIntervalError(
          'the start time 4:30:00 PM is a after of end time 3:30:00 PM',
        ),
      );
    }
  });
});

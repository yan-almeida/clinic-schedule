import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';
import { format } from 'date-fns';

describe('DailyAttendance', () => {
  it('should crete a daily attendance by constructor', () => {
    const interval = IntervalMock.validInterval();

    const specificDayAttendance = new DailyAttendance(interval);

    expect(specificDayAttendance.type).toEqual(AttendanceType.DAILY);
    expect(specificDayAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should crete a daily attendance by static method', () => {
    const interval = IntervalMock.validInterval();

    const specificDayAttendance = DailyAttendance.from(interval);

    expect(specificDayAttendance.type).toEqual(AttendanceType.DAILY);
    expect(specificDayAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should return an attendance day of created daily attendace', () => {
    const interval = IntervalMock.validInterval();
    const now = new Date();

    const specificDayAttendance = DailyAttendance.from(interval);

    const asAttendanceDay = specificDayAttendance.asAttendanceDay(now);

    expect(asAttendanceDay).toMatchObject<AttendanceDay>({
      day: format(now, 'MM-dd-yyyy'),
      interval,
    });
    expect(specificDayAttendance.interval).toBeInstanceOf(Interval);
  });
});

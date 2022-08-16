import { DateCannotBeforeToday } from '@core/domain/attendance/errors/date-cannot-before-today.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { addDays, subDays } from 'date-fns';

describe('SpecificDateAttendance', () => {
  it('should crete an attendance in specific day by constructor', () => {
    const interval = IntervalMock.validInterval();

    const tomorrowDate = addDays(new Date(), 1);

    const specificDayAttendance = new SpecificDateAttendance(
      tomorrowDate,
      interval,
    );

    expect(specificDayAttendance.date).toEqual(tomorrowDate);
    expect(specificDayAttendance.type).toEqual(AttendanceType.SPECIFIC_DATE);
    expect(specificDayAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should crete an attendance in specific day by static method', () => {
    const interval = IntervalMock.validInterval();

    const tomorrowDate = addDays(new Date(), 1);

    const specificDayAttendance = SpecificDateAttendance.from(
      tomorrowDate,
      interval,
    );

    expect(specificDayAttendance.date).toEqual(tomorrowDate);
    expect(specificDayAttendance.type).toEqual(AttendanceType.SPECIFIC_DATE);
    expect(specificDayAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should throws when try to create an attendance in specific day with wrong day (yesterday)', () => {
    const interval = IntervalMock.validInterval();

    const yesterdayDate = subDays(new Date(), 1);
    try {
      SpecificDateAttendance.from(yesterdayDate, interval);
    } catch (error) {
      expect(error).toBeInstanceOf(DateCannotBeforeToday);
      expect(error).toEqual(
        new DateCannotBeforeToday('the appointment day cannot be before today'),
      );
    }
  });
});

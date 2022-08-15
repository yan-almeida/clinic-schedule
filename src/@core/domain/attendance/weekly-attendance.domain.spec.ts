import { WithoutDayOfWeek } from '@core/domain/attendance/errors/whitout-day-of-week.error';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';

describe('WeeklyAttendance', () => {
  it('should crete an weekly attendance in specific day by constructor', () => {
    const daysOfWeek = [DaysOfWeek.MON, DaysOfWeek.THU];
    const interval = IntervalMock.validInterval();

    const weeklyAttendance = new WeeklyAttendance(daysOfWeek, interval);

    expect(weeklyAttendance.daysOfWeek).toEqual(daysOfWeek);
    expect(weeklyAttendance.type).toEqual(AttendanceType.WEEKLY);
    expect(weeklyAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should crete an weekly attendance in specific day by static method', () => {
    const daysOfWeek = [DaysOfWeek.MON, DaysOfWeek.THU];
    const interval = IntervalMock.validInterval();

    const weeklyAttendance = WeeklyAttendance.from(daysOfWeek, interval);

    expect(weeklyAttendance.daysOfWeek).toEqual(daysOfWeek);
    expect(weeklyAttendance.type).toEqual(AttendanceType.WEEKLY);
    expect(weeklyAttendance.interval).toBeInstanceOf(Interval);
  });

  it('should throws when try to create an attendance in specific day with wrong day (yesterday)', () => {
    const emptyDaysOfWeek: DaysOfWeek[] = [];
    const interval = IntervalMock.validInterval();

    try {
      WeeklyAttendance.from(emptyDaysOfWeek, interval);
    } catch (error) {
      expect(error).toBeInstanceOf(WithoutDayOfWeek);
      expect(error).toEqual(
        new WithoutDayOfWeek(
          'It is not possible to schedule an appointment without a day a week',
        ),
      );
    }
  });
});

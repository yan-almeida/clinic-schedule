import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { NonSpecificTypeOfAttendance } from '@core/domain/attendance/errors/non-specific-type.error';
import { AttendanceFactory } from '@core/domain/attendance/factories/attendance.factory';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';

describe('AttendanceFactory', () => {
  const attendanceFactory = new AttendanceFactory();

  it('should create an instance of specific date attendance - based on specific date', () => {
    const type = AttendanceType.SPECIFIC_DATE;
    const interval = IntervalMock.validInterval();

    const attendanceStrategy = attendanceFactory.build(type);

    const attendance = attendanceStrategy.create({
      interval,
      type,
      date: new Date(),
    });

    expect(attendance).toBeInstanceOf(SpecificDateAttendance);
  });

  it('should create an instance of specific date attendance - based on dily', () => {
    const type = AttendanceType.DAILY;
    const interval = IntervalMock.validInterval();

    const attendanceStrategy = attendanceFactory.build(type);

    const attendance = attendanceStrategy.create({
      interval,
      type,
    });

    expect(attendance).toBeInstanceOf(DailyAttendance);
  });

  it('should create an instance of specific date attendance - based on weekly', () => {
    const type = AttendanceType.WEEKLY;
    const interval = IntervalMock.validInterval();

    const attendanceStrategy = attendanceFactory.build(type);

    const attendance = attendanceStrategy.create({
      interval,
      type,
      daysOfWeek: [DaysOfWeek.FRI, DaysOfWeek.SUN],
    });

    expect(attendance).toBeInstanceOf(WeeklyAttendance);
  });

  it('should throws an error when factory type is not same type of passed in factory', () => {
    const type = AttendanceType.WEEKLY;
    const interval = IntervalMock.validInterval();

    const attendanceStrategy = attendanceFactory.build(type);

    try {
      attendanceStrategy.create({
        interval,
        type: AttendanceType.SPECIFIC_DATE,
        daysOfWeek: [DaysOfWeek.FRI, DaysOfWeek.SUN],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NonSpecificTypeOfAttendance);
      expect(error).toEqual(
        new NonSpecificTypeOfAttendance('is not an weekly attendance'),
      );
    }
  });
});

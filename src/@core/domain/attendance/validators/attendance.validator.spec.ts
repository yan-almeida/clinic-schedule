import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { AttendanceRuleMock } from '@core/domain/attendance/mocks/atendance-rule.mock';
import {
  isAnDailyAttendance,
  isAnSpecificDateAttendance,
  isAnWeeklyAttendance,
} from '@core/domain/attendance/validators/attendance.validator';

describe('AttendanceRule', () => {
  it('should return true when attendance type is a weekly attendance', () => {
    expect(
      isAnWeeklyAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.WEEKLY,
        ),
      ),
    ).toBeTruthy();
  });

  it('should return true when attendance type is a daily attendance', () => {
    expect(
      isAnDailyAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.DAILY,
        ),
      ),
    ).toBeTruthy();
  });

  it('should return false when attendance type is not a specific date attendance', () => {
    expect(
      isAnSpecificDateAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.SPECIFIC_DATE,
        ),
      ),
    ).toBeTruthy();
  });

  it('should return false when attendance type is not a weekly attendance', () => {
    expect(
      isAnWeeklyAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.DAILY,
        ),
      ),
    ).toBeFalsy();
  });

  it('should return false when attendance type is not a daily attendance', () => {
    expect(
      isAnDailyAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.SPECIFIC_DATE,
        ),
      ),
    ).toBeFalsy();
  });

  it('should return false when attendance type is not a specific date attendance', () => {
    expect(
      isAnSpecificDateAttendance(
        AttendanceRuleMock.validAttendanceRuleWithCustomType(
          AttendanceType.WEEKLY,
        ),
      ),
    ).toBeFalsy();
  });
});

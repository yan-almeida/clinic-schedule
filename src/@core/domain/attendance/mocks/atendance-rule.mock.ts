import { AttendanceRule } from '@core/domain/attendance/attendance-rule.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { IntervalMock } from '@core/domain/attendance/mocks/interval.mock';

export class AttendanceRuleMock {
  static validAttendanceRuleWithCustomType(
    type: AttendanceType,
  ): AttendanceRule {
    const interval = IntervalMock.validInterval();

    return {
      interval,
      type,
    };
  }
}

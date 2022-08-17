import { AttendanceDay } from '@core/domain/attendance/attendance-day.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { Interval } from '@core/domain/attendance/interval.domain';
import { randomUUID } from 'crypto';

export abstract class Attendance {
  id: string;
  type: AttendanceType;
  interval: Interval;

  constructor(type: AttendanceType, interval: Interval, id?: string) {
    this.type = type;
    this.interval = interval;
    this.id = id ?? randomUUID();
  }

  abstract asAttendanceDay(day: Date): AttendanceDay | undefined;
}

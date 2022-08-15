import { randomUUID } from 'crypto';
import { AttendanceType } from './attendance-type.enum';
import { Interval } from './interval.domain';

export abstract class Attendance {
  #id: string;
  #type: AttendanceType;
  #interval: Interval;

  constructor(type: AttendanceType, interval: Interval, id?: string) {
    this.#type = type;
    this.#interval = interval;
    this.#id = id ?? randomUUID();
  }

  get id(): string {
    return this.#id;
  }

  get type(): AttendanceType {
    return this.#type;
  }

  get interval(): Interval {
    return this.#interval;
  }
}

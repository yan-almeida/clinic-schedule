import { isAfter } from 'date-fns';
import { DateIntervalError } from './errors/date-interval.error';

export class Interval {
  #start: Date;
  #end: Date;

  constructor(start: Date, end: Date) {
    this.#start = start;
    this.#end = end;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  static from(start: Date, end: Date): Interval {
    if (isAfter(start, end)) {
      throw new DateIntervalError(
        `the start time ${start.toLocaleTimeString()} is a after of end time ${end.toLocaleTimeString()}`,
      );
    }

    return new Interval(start, end);
  }
}
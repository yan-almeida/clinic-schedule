export class Interval {
  start: string;
  end: string;

  constructor(start: string, end: string) {
    this.start = start;
    this.end = end;
  }

  static from(start: string, end: string): Interval {
    return new Interval(start, end);
  }
}

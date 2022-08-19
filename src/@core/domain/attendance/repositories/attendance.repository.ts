import { Attendance } from '@core/domain/attendance/attendance.domain';

export interface AttendanceRepository {
  insert(payload: Attendance): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Attendance[]>;
}

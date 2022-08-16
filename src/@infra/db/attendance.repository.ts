import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceRepository } from '@core/domain/attendance/repositories/attendance.repository';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { readFile, writeFile } from 'fs/promises';

const PATH = 'database.json';

export class LocalAttendanceRepository implements AttendanceRepository {
  async insert(attendance: Attendance): Promise<void> {
    const attendances = await this.findAll();

    await writeFile(PATH, JSON.stringify([...attendances, attendance]));
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<SpecificDateAttendance[]> {
    const buffer = await readFile(PATH, {
      encoding: 'utf-8',
    });

    return JSON.parse(buffer);
  }
}

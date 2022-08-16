import { DailyAttendance } from '@core/domain/attendance/daily-attendance.domain';
import { AttendanceRepository } from '@core/domain/attendance/repositories/attendance.repository';
import { SpecificDateAttendance } from '@core/domain/attendance/specific-date-attendance.domain';
import { WeeklyAttendance } from '@core/domain/attendance/weekly-attendance.domain';
import { readFile, writeFile } from 'fs/promises';

const PATH = 'database.json';

export class LocalAttendanceRepository
  implements
    AttendanceRepository<
      SpecificDateAttendance | DailyAttendance | WeeklyAttendance
    >
{
  async insert(
    attendance: SpecificDateAttendance | DailyAttendance | WeeklyAttendance,
  ): Promise<void> {
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

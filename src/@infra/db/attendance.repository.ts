import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceRepository } from '@core/domain/attendance/repositories/attendance.repository';
import { readFile, writeFile } from 'fs/promises';

const PATH = 'database.json';

export class LocalAttendanceRepository implements AttendanceRepository {
  async insert(attendance: Attendance): Promise<void> {
    const attendances = await this.findAll();

    await writeFile(PATH, JSON.stringify([...attendances, attendance]));
  }

  async delete(id: string): Promise<void> {
    const attendances = await this.findAll();
    const newAttendances = attendances.filter(
      (attendance) => attendance.id !== id,
    );

    await writeFile(PATH, JSON.stringify(newAttendances));
  }

  async findAll(): Promise<Attendance[]> {
    const buffer = await readFile(PATH, {
      encoding: 'utf-8',
    });

    return JSON.parse(buffer);
  }
}

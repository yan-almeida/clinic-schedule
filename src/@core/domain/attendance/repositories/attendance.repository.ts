import { Attendance } from '@core/domain/attendance/attendance.domain';
import { AttendanceType } from '@core/domain/attendance/interfaces/attendance-type.enum';
import { DaysOfWeek } from '@core/domain/attendance/interfaces/days-of-week.enum';

export interface Insert {
  type: AttendanceType;
  end: Date;
  start: Date;
  daysOfWeek?: Array<DaysOfWeek>;
  date?: Date;
}

export interface AttendanceRepository<Att extends Attendance> {
  insert(payload: Att): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Att[]>;
}

// - Cadastrar regras de horários para atendimento
// - Apagar regra de horário para atendimento
// - Listar regras de horários para atendimento
// - Listar horários disponíveis dentro de um intervalo

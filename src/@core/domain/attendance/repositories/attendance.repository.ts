import { Attendance } from '@core/domain/attendance/attendance.domain';

export interface AttendanceRepository {
  insert(payload: Attendance): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Attendance[]>;
}

// - Cadastrar regras de horários para atendimento
// - Apagar regra de horário para atendimento
// - Listar regras de horários para atendimento
// - Listar horários disponíveis dentro de um intervalo

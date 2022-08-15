import { Attendance } from '@core/domain/attendance/attendance.domain';

export interface AttendanceRepository {
  insert<Att extends Attendance>(attendance: Att): Promise<void>;
  delete(id: string): Promise<void>;
}

// - Cadastrar regras de horários para atendimento
// - Apagar regra de horário para atendimento
// - Listar regras de horários para atendimento
// - Listar horários disponíveis dentro de um intervalo

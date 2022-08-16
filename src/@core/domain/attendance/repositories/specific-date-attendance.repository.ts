export interface SpecificDateAttendanceRepository {
  insert(date: Date, interval: Interval): Promise<void>;
}

// - Cadastrar regras de horários para atendimento
// - Apagar regra de horário para atendimento
// - Listar regras de horários para atendimento
// - Listar horários disponíveis dentro de um intervalo

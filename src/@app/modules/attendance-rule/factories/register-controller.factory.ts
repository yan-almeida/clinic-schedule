import { ClinicScheduleController } from '@app/modules/attendance-rule/attendance-rules.controller';
import { AttendanceRulesService } from '@app/modules/attendance-rule/attendance-rules.service';
import { LocalAttendanceRepository } from '@infra/db/attendance.repository';
import { Router } from 'express';

const localAttendanceRepository = new LocalAttendanceRepository();
const attendanceRulesService = new AttendanceRulesService(
  localAttendanceRepository,
);
const clinicScheduleController = new ClinicScheduleController(
  attendanceRulesService,
);

const attendanceRuleRouter = Router();

attendanceRuleRouter.post('', (req, res) =>
  clinicScheduleController.create(req, res),
);

attendanceRuleRouter.get('', (req, res) =>
  clinicScheduleController.findAll(req, res),
);

attendanceRuleRouter.delete('/:id', (req, res) =>
  clinicScheduleController.delete(req, res),
);

attendanceRuleRouter.get('/available-times', (req, res) =>
  clinicScheduleController.findAvailableTimes(req, res),
);

export default attendanceRuleRouter;

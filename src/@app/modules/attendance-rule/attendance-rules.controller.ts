import { AttendanceRulesService } from '@app/modules/attendance-rule/attendance-rules.service';
import { CreateAttendanceRuleDto } from '@app/modules/attendance-rule/dtos/create-attendance-rule.dto';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

export class ClinicScheduleController {
  constructor(
    private readonly attendanceRulesService: AttendanceRulesService,
  ) {}

  async create(req: Request, res: Response) {
    const dto: CreateAttendanceRuleDto = req.body;

    const attendance = await this.attendanceRulesService.create(dto);

    res.status(httpStatus.CREATED).json({ attendance });
  }

  async findAll(_: Request, res: Response) {
    const attendanceRules = await this.attendanceRulesService.findAll();

    res.status(httpStatus.OK).json(attendanceRules);
  }
}

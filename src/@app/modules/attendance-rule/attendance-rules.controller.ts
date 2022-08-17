import { AttendanceRulesService } from '@app/modules/attendance-rule/attendance-rules.service';
import { CreateAttendanceRuleDto } from '@app/modules/attendance-rule/dtos/create-attendance-rule.dto';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';

export class ClinicScheduleController {
  constructor(
    private readonly attendanceRulesService: AttendanceRulesService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const dto: CreateAttendanceRuleDto = req.body;

    const attendance = await this.attendanceRulesService.create(dto);

    res.status(httpStatus.CREATED).json({ attendance });
  }

  async findAll(_: Request, res: Response): Promise<void> {
    const attendanceRules = await this.attendanceRulesService.findAll();

    res.json(attendanceRules);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.attendanceRulesService.delete(id);

    res.sendStatus(httpStatus.NO_CONTENT);
  }

  async findAvailableTimes(req: Request<any, any, any, any>, res: Response) {
    const { from, to } = req.query;

    const attendanceRules =
      await this.attendanceRulesService.findAvailableTimes(
        new Date(from),
        new Date(to),
      );

    res.json(attendanceRules);
  }
}

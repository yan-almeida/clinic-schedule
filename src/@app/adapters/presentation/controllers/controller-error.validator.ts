import ApiError from '@app/adapters/presentation/controllers/controller.error';
import { Logger } from '@core/utils/logger';
import { NextFunction, Request, Response } from 'express';

export interface HTTPError extends Error {
  status?: number;
}

export function ControllerErrorValidator(
  error: HTTPError,
  _: Partial<Request>,
  res: Response,
  __: NextFunction,
): void {
  const logger = new Logger(ControllerErrorValidator.name);
  const errorCode = error.status || 500;

  const apiError = ApiError.format({
    code: errorCode,
    message: error.message,
  });

  logger.error(error);

  res.status(errorCode).json(apiError);
}

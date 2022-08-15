import ApiError from '@infra/adapters/presentation/controllers/controller.error';
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
  const errorCode = error.status || 500;
  res
    .status(errorCode)
    .json(ApiError.format({ code: errorCode, message: error.message }));
}

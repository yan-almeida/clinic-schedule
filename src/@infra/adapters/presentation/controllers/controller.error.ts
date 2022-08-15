import HttpStatus from 'http-status-codes';

export interface ControllerError {
  message: string;
  code: number;
  description?: string;
}

export interface APIErrorResponse extends ControllerError {
  error: string;
}

export default class ApiError {
  static format(error: ControllerError): APIErrorResponse {
    return {
      message: error.message,
      code: error.code,
      error: HttpStatus.getStatusText(error.code),
      ...(error.description && { description: error.description }),
    };
  }
}

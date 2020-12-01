import HttpError from 'exception/HttpError';
import { Response } from 'express';

export const disposeError = (error: Error | HttpError, response: Response) => {
  let errors = null;
  
  if (error instanceof HttpError) {
    errors = {
      status: error.statusCode,
      message: error.message,
    };
  } else {
    errors = {
      status: 500,
      message: "서버 오류입니다",
    }
  }

  const { status, message } = errors;
  return response.status(errors.status).json({
    status,
    message,
  });
};
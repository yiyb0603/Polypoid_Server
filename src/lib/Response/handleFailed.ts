import { Response } from 'express';

export const handleFailed = (response: Response, status: number, message: string) => {
  response.status(status).json({
    status,
    message,
  }) 
}
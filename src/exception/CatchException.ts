import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import HttpError from "./HttpError";

@Catch()
export class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let customError: HttpError | any = {};

    if (exception instanceof HttpError) {
      customError = {
        status: exception.statusCode,
        message: exception.message,
      };
    } 
    
    else {
      customError = {
        status: 500,
        message: "서버 오류입니다.",
      };
    }

    const { status, message } = customError;
    return response.status(customError.status).json({
      status,
      message,
    })
  }
}
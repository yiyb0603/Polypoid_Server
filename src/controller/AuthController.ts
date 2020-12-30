import { NextFunction, Response } from 'express';
import { Body, Controller, Next, Post, Res } from "@nestjs/common";
import { UserService } from '../service/UserService';
import { disposeError } from 'lib/DisposeError';
import { handleSuccess } from 'lib/Response/handleSuccess';
import { SignInDto, SignUpDto } from 'entity/dto/Auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  public async signIn(@Body() request: SignInDto, @Res() response: Response) {
    try {
      const userToken: string = await this.userService.signIn(request);
      handleSuccess(response, 200, '로그인을 성공하였습니다.', { userToken });
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Post('signup')
  public async signUp(@Body() request: SignUpDto, @Res() response: Response, @Next() next: NextFunction) {
    try {
      await this.userService.signUp(request);
      handleSuccess(response, 200, '회원가입을 성공하였습니다.');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }
};
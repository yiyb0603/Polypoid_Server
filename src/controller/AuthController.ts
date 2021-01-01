import { NextFunction, Response } from 'express';
import { Body, Controller, Next, Post, Res } from "@nestjs/common";
import { UserService } from '../service/UserService';
import { disposeError } from 'lib/DisposeError';
import { handleSuccess } from 'lib/Response/handleSuccess';
import { SignInDto, SignUpDto } from 'entity/dto/Auth.dto';
import { IGoogleBody } from 'types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('googleSign')
  public async googleSign(@Body() body: IGoogleBody, @Res() response: Response) {
    try {
      const userToken: string = await this.userService.googleSign(body);
      console.log(userToken);
      handleSuccess(response, 200, '로그인을 성공하였습니다.', { userToken });
      return;
    } catch (error) {
      console.log(error);
      disposeError(error, response);
    }
  }

  @Post('signin')
  public async signIn(@Body() body: SignInDto, @Res() response: Response) {
    try {
      const userToken: string = await this.userService.signIn(body);
      handleSuccess(response, 200, '로그인을 성공하였습니다.', { userToken });
      return;
    } catch (error) {
      console.log(error);
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
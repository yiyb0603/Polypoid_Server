import { NextFunction, Response } from 'express';
import { Body, Controller, Next, Post, Res } from "@nestjs/common";
import { UserService } from '../service/UserService';
import { handleSuccess } from 'lib/Response/handleSuccess';
import { SignInDto, SignUpDto } from 'entity/dto/Auth.dto';
import { IGoogleBody } from 'types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('googleSign')
  public async googleSign(@Body() body: IGoogleBody, @Res() response: Response) {
    const userToken: string = await this.userService.googleSign(body);
    handleSuccess(response, 200, '로그인을 성공하였습니다.', { userToken });
    return;
  }

  @Post('signin')
  public async signIn(@Body() body: SignInDto, @Res() response: Response) {
    const userToken: string = await this.userService.signIn(body);
    handleSuccess(response, 200, '로그인을 성공하였습니다.', { userToken });
    return;
  }

  @Post('signup')
  public async signUp(@Body() request: SignUpDto, @Res() response: Response, @Next() next: NextFunction) {
    await this.userService.signUp(request);
    handleSuccess(response, 200, '회원가입을 성공하였습니다.');
    return;
  }
};
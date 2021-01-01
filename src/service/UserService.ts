import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from 'axios';
import { sha256 } from 'js-sha256';
import HttpError from "exception/HttpError";
import { createToken } from "lib/Token";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { SignInDto, SignUpDto } from "entity/dto/Auth.dto";
import { IGoogleBody } from "types/user";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(request: SignUpDto): Promise<void> {
    const { id, name } = request;

    const existUser = await this.getUser(id);
    if (existUser) {
      throw new HttpError(409, "해당 아이디의 회원이 존재합니다.");
    }

    const user: User = new User();
    user.id = id;
    user.password = request.password;
    user.name = name;
    user.joined_at = new Date();

    await this.userRepository.save(user);
  }

  public async signIn(request: SignInDto): Promise<string> {
    const { id, password } = request;
    const user: User = await this.getUserBySignIn(id, password);

    if (user) {
      const userToken: string = createToken(user.id, user.name);
      return userToken;
    }
  }

  public async googleSign(request: IGoogleBody): Promise<string> {
    const { accessToken } = request;
    
    const googleURL: string = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    const googleUser: AxiosResponse = await axios.get(googleURL);

    const existUser: User = await this.getUser(googleUser.data.sub, "google");
    if (!existUser) {
      const { sub, name } = googleUser.data;

      const user = new User();
      user.id = sub;
      user.name = name;
      user.password = sha256(sub);
      user.joined_at = new Date();

      await this.userRepository.save(user);
      
      const userToken: string = createToken(sub, name);
      return userToken;
    }

    const userToken: string = createToken(existUser.id, existUser.name);
    return userToken;
  }

  public async getUserBySignIn(id: string, password: string): Promise<User> | null {
    const user: User = await this.userRepository.findOne({
      where: {
        id,
        password,
      },
    });

    if (!user) {
      throw new HttpError(404, "존재하는 회원이 없습니다.");
    }

    return user;
  }

  public async getUser(id: string, type?: string) {
    const user: User = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user && type !== 'google') {
      throw new HttpError(404, "존재하는 회원이 없습니다.");
    }
    
    return user;
  }
}
import { Injectable } from "@nestjs/common";
import HttpError from "exception/HttpError";
import { createToken } from "lib/Token";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
import { SignInDto, SignUpDto } from "entity/dto/Auth.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(request: SignUpDto): Promise<User> {
    const { id, password, name } = request;

    const existUser = await this.getUser(id);
    if (existUser) {
      throw new HttpError(409, "해당 아이디의 회원이 존재합니다.");
    }

    const user: User = new User();
    user.id = id;
    user.password = password;
    user.name = name;
    user.joined_at = new Date();

    await this.userRepository.save(user);
    return user;
  }

  public async signIn(request: SignInDto): Promise<string> {
    const { id, password } = request;
    const user: User = await this.getUserBySignIn(id, password);

    const userToken: string = createToken(user.id, user.name, user.is_admin);
    return userToken;
  }

  public async getUserBySignIn(id: string, password: string): Promise<User> | null {
    const user: User = await this.userRepository.findOne({
      where: {
        id,
        password,
      },
    });

    return user;
  }

  public async getUser(id: string) {
    const user: User = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpError(404, "존재하는 회원이 없습니다.");
    }
    
    return user;
  }
}
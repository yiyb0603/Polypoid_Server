import { IsString } from "class-validator";

export class SignInDto {
  @IsString()
  readonly id: string;
  
  @IsString()
  readonly password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  readonly name: string;
}
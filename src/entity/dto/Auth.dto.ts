import { IsString } from "class-validator";

export class SignInDto {
  @IsString()
  id: string;
  
  @IsString()
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  name: string;
}
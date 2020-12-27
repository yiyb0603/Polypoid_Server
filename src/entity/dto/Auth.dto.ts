import { IsString } from "class-validator";

export class AuthDto {
  @IsString()
  id: string;

  @IsString()
  name?: string;
  
  @IsString()
  password: string;
}
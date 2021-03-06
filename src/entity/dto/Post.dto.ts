import { IsNumber, IsString } from "class-validator";

export class PostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  // @IsNumber()
  // readonly categoryIdx: number;
}
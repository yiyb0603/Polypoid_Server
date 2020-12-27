import { IsNumber, IsString, IsOptional } from "class-validator";

export class PostDto {
  @IsNumber()
  @IsOptional()
  readonly idx: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly categoryIdx: number;

  @IsString()
  readonly writerId: string;

  @IsString()
  readonly writerName: string;
}
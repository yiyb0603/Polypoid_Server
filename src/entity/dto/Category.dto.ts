import { IsNumber, IsOptional, IsString } from "class-validator";

export class CategoryDto {
  @IsNumber()
  @IsOptional()
  readonly idx: number;

  @IsString()
  readonly name: string;
}
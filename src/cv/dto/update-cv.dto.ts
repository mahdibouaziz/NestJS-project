import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  age: number;

  @IsString()
  @IsOptional()
  path: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cin: number;

  @IsString()
  @IsOptional()
  job: string;
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCvDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  path: string;

  @IsNumber()
  @Type(() => Number)
  cin: number;

  @IsString()
  job: string;
}

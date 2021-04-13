import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TodoDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  status: string;
}

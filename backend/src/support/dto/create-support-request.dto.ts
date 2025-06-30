import { IsString } from 'class-validator';

export class CreateSupportRequestDto {
  @IsString()
  user: string;

  @IsString()
  text: string;
}
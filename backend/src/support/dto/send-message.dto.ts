import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  author: string;

  @IsString()
  supportRequest: string;

  @IsString()
  text: string;
}
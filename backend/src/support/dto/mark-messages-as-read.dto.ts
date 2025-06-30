import { IsString, IsDate } from 'class-validator';

export class MarkMessagesAsReadDto {
  @IsString()
  user: string;

  @IsString()
  supportRequest: string;

  @IsDate()
  createdBefore: Date;
}
import { IsString, IsOptional } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
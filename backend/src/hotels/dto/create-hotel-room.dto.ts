import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateHotelRoomDto {
  @IsString()
  hotel: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
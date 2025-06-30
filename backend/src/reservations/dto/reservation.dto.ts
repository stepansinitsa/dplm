import { IsString, IsDate } from 'class-validator';

export interface ReservationDto {
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}
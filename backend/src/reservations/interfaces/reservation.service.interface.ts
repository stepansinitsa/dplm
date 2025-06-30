import { Reservation } from '../schemas/reservation.schema';
import { ReservationDto } from '../dto/reservation.dto';

export interface SearchReservationParams {
  userId?: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IReservationService {
  create(data: ReservationDto): Promise<Reservation>;
  findById(id: string): Promise<Reservation>;
  findByUserId(userId: string): Promise<Reservation[]>;
  remove(id: string): Promise<void>;
  isRoomAvailable(roomId: string, dateStart: Date, dateEnd: Date): Promise<boolean>;
}
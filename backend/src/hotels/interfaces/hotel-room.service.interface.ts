import { HotelRoom } from '../schemas/hotel-room.schema';
import { CreateHotelRoomDto } from '../dto/create-hotel-room.dto';

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: string;
  isEnabled?: boolean;
}

export interface IHotelRoomService {
  create( CreateHotelRoomDto): Promise<HotelRoom>;
  findById(id: string): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string,  Partial<CreateHotelRoomDto>): Promise<HotelRoom>;
  remove(id: string): Promise<void>;
}
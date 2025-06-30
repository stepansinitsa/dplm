import { Hotel } from '../schemas/hotel.schema';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title?: string;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelDto): Promise<Hotel>;
  remove(id: string): Promise<void>;
}
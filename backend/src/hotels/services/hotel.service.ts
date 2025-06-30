import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHotelService, SearchHotelParams } from '../interfaces/hotel.service.interface';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { Hotel, HotelDocument } from '../schemas/hotel.schema';
import { CreateHotelDto } from '../dto/create-hotel.dto';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(data: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(data);
    return createdHotel.save();
  }

  async findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const query: any = {};
    if (params.title) {
      query.title = { $regex: params.title, $options: 'i' };
    }
    return this.hotelModel.find(query).limit(params.limit).skip(params.offset).exec();
  }

  async update(id: string, data: UpdateHotelDto): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.hotelModel.findByIdAndDelete(id).exec();
  }
}
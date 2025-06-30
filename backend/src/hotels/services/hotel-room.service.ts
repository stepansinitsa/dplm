import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from '../schemas/hotel-room.schema';
import { CreateHotelRoomDto } from '../dto/create-hotel-room.dto';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: CreateHotelRoomDto): Promise<HotelRoom> {
    const createdRoom = new this.hotelRoomModel(data);
    return createdRoom.save();
  }

  async findById(id: string): Promise<HotelRoom> {
    return this.hotelRoomModel.findById(id).exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const query: any = {};
    if (params.hotel) {
      query.hotel = params.hotel;
    }
    if (params.isEnabled !== undefined) {
      query.isEnabled = params.isEnabled;
    }

    return this.hotelRoomModel.find(query).limit(params.limit).skip(params.offset).exec();
  }

  async update(id: string, data: Partial<CreateHotelRoomDto>): Promise<HotelRoom> {
    return this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.hotelRoomModel.findByIdAndDelete(id).exec();
  }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../schemas/hotel.schema';

@Injectable()
export class HotelMediaService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async uploadImages(id: string, files: Express.Multer.File[]) {
    const hotel = await this.hotelModel.findById(id).exec();
    hotel.images = [...hotel.images, ...files.map(f => f.filename)];
    return hotel.save();
  }

  async deleteImage(id: string, imageId: string) {
    const hotel = await this.hotelModel.findById(id).exec();
    hotel.images = hotel.images.filter(img => img !== imageId);
    return hotel.save();
  }
}
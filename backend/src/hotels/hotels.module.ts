import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from '../schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from '../schemas/hotel-room.schema';
import { HotelService } from '../services/hotel.service';
import { HotelMediaService } from '../services/hotel-media.service';
import { HotelAdminController } from '../controllers/hotel.controller';
import { HotelMediaController } from '../controllers/hotel-media.controller';
import { HotelRoomAdminController } from '../controllers/hotel-room.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelService, HotelMediaService],
  controllers: [HotelAdminController, HotelMediaController, HotelRoomAdminController],
  exports: [HotelService, HotelMediaService],
})
export class HotelsModule {}
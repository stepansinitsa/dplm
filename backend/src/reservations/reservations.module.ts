import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';
import { IReservationService } from '../interfaces/reservation.service.interface';
import { ReservationService } from '../services/reservation.service';
import { ClientReservationController } from '../controllers/reservation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])
  ],
  providers: [ReservationService],
  controllers: [ClientReservationController],
  exports: [ReservationService]
})
export class ReservationsModule {}
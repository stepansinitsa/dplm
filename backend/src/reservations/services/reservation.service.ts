import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../schemas/reservation.schema';
import { ReservationDto } from '../dto/reservation.dto';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(data: ReservationDto): Promise<Reservation> {
    const created = new this.reservationModel(data);
    return created.save();
  }

  async findById(id: string): Promise<Reservation> {
    return this.reservationModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ userId }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async isRoomAvailable(roomId: string, dateStart: Date, dateEnd: Date): Promise<boolean> {
    const count = await this.reservationModel.countDocuments({
      roomId,
      $or: [
        { dateStart: { $lt: dateEnd }, dateEnd: { $gt: dateStart } },
        { dateStart: { $gte: dateStart }, dateEnd: { $lte: dateEnd } },
      ],
    }).exec();

    return count === 0;
  }
}
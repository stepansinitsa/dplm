import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SessionGuard } from '../../auth/guards/session.guard';
import { IReservationService } from '../interfaces/reservation.service.interface';
import { ReservationDto } from '../dto/reservation.dto';

@Controller('api/client/reservations')
@UseGuards(SessionGuard)
export class ClientReservationController {
  constructor(private readonly reservationService: IReservationService) {}

  @Post()
  async create(@Body() dto: ReservationDto) {
    const available = await this.reservationService.isRoomAvailable(
      dto.roomId,
      dto.dateStart,
      dto.dateEnd,
    );
    if (!available) {
      throw new Error('Номер занят на указанные даты');
    }
    return this.reservationService.create(dto);
  }

  @Get()
  async findAllByUser(@Query('userId') userId: string) {
    return this.reservationService.findByUserId(userId);
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
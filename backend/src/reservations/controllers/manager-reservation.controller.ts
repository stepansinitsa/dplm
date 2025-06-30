import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';
import { IReservationService } from '../interfaces/reservation.service.interface';

@Controller('api/manager/reservations')
@UseGuards(new RoleGuard(Role.MANAGER))
export class ManagerReservationController {
  constructor(private readonly reservationService: IReservationService) {}

  @Get(':userId')
  async getReservationsByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUserId(userId);
  }

  @Delete(':id')
  async cancelByManager(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
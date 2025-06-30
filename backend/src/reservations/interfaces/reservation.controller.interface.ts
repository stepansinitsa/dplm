import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';

// Пример использования в контроллере
@UseGuards(new RoleGuard(Role.CLIENT))
@Controller('api/client/reservations')
export class ClientReservationController {
  constructor(private readonly reservationService: IReservationService) {}

  @Post()
  async create(@Body() dto: ReservationDto) {
    const available = await this.reservationService.isRoomAvailable(
      dto.roomId,
      dto.dateStart,
      dto.dateEnd,
    );
    if (!available) throw new Error('Номер занят на эти даты');
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
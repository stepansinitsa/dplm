import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { HotelService } from '../services/hotel.service';
import { CreateHotelDto } from '../dto/create-hotel.dto';

@Controller('api/admin/hotels')
@UseGuards(new RoleGuard(Role.ADMIN))
export class HotelAdminController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() dto: CreateHotelDto) {
    return this.hotelService.create(dto);
  }

  @Get()
  findAll() {
    return this.hotelService.search({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
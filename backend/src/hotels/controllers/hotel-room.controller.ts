import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelRoom } from '../schemas/hotel-room.schema';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';

import { HotelRoomService } from '../services/hotel-room.service';
import { CreateHotelRoomDto } from '../dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from '../dto/update-hotel-room.dto';

@Controller('api/admin/hotel-rooms')
@UseGuards(new RoleGuard(Role.ADMIN))
export class HotelRoomAdminController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  /**
   * Создание нового номера гостиницы
   */
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() dto: CreateHotelRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<HotelRoom> {
    // Проверяем наличие отеля и хотя бы одного изображения
    if (!dto.hotel || !files || files.length === 0) {
      throw new Error('Необходимо указать гостиницу и загрузить хотя бы одно изображение');
    }

    // Добавляем пути к изображениям из загруженных файлов
    const roomData = {
      ...dto,
      images: files.map(file => file.filename),
    };

    return this.hotelRoomService.create(roomData);
  }

  /**
   * Получение информации о номере
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HotelRoom> {
    return this.hotelRoomService.findById(id);
  }

  /**
   * Обновление данных о номере
   */
  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateHotelRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<HotelRoom> {
    // Добавляем новые изображения к существующим
    if (files?.length > 0) {
      const newImages = files.map(file => file.filename);
      dto.images = [...(dto.images || []), ...newImages];
    }

    return this.hotelRoomService.update(id, dto);
  }

  /**
   * Удаление номера
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.hotelRoomService.remove(id);
  }
}
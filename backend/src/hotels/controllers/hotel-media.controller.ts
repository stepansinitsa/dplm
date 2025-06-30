import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';

import { HotelMediaService } from '../services/hotel-media.service';
import { UploadImagesDto } from '../dto/upload-images.dto';

@Controller('api/admin/hotels/media')
@UseGuards(new RoleGuard(Role.ADMIN))
export class HotelMediaController {
  constructor(private readonly mediaService: HotelMediaService) {}

  @Post(':id')
  @UseInterceptors(FilesInterceptor('images'))
  uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.mediaService.uploadImages(id, files);
  }

  @Delete(':id/images/:imageId')
  deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.mediaService.deleteImage(id, imageId);
  }
}
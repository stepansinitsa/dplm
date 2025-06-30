import { IsArray } from 'class-validator';

export class UploadImagesDto {
  @IsArray()
  images: string[];
}
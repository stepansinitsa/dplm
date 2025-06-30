import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { SessionGuard } from '../../auth/guards/session.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';

import { ISupportRequestService } from '../interfaces/support-request.service.interface';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';

@Controller('api/client/support-requests')
@UseGuards(SessionGuard)
export class ClientSupportRequestController {
  constructor(private readonly service: ISupportRequestService) {}

  @Post()
  create(@Body() dto: CreateSupportRequestDto) {
    return this.service.sendMessage({
      ...dto,
      supportRequest: dto.user,
    });
  }

  @Get()
  list(@Query('isActive') isActive: boolean) {
    return this.service.findSupportRequests({ isActive });
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.service.getMessages(id);
  }

  @Post(':id/messages')
  sendMessage(@Param('id') id: string, @Body() dto: SendMessageDto) {
    return this.service.sendMessage({
      ...dto,
      supportRequest: id,
    });
  }

  @Post(':id/messages/read')
  markRead(@Param('id') id: string, @Body() dto: MarkMessagesAsReadDto) {
    return this.service.markMessagesAsRead({
      ...dto,
      supportRequest: id,
    });
  }
}
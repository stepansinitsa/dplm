import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/enums/roles.enum';

import { ISupportRequestService } from '../interfaces/support-request.service.interface';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';

@Controller('api/manager/support-requests')
@UseGuards(new RoleGuard(Role.MANAGER))
export class ManagerSupportRequestController {
  constructor(private readonly service: ISupportRequestService) {}

  @Post(':id/messages/read')
  markRead(@Param('id') id: string, @Body() dto: MarkMessagesAsReadDto) {
    return this.service.markMessagesAsRead({
      ...dto,
      supportRequest: id,
    });
  }

  @Post(':id/close')
  closeRequest(@Param('id') id: string) {
    return this.service.closeRequest(id);
  }
}
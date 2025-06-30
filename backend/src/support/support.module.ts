import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequest, SupportRequestSchema } from '../schemas/support-request.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import { SupportRequestService } from '../services/support-request.service';
import { ClientSupportRequestController } from '../controllers/support-request.controller';
import { ManagerSupportRequestController } from '../controllers/employee-support-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema }
    ]),
  ],
  providers: [SupportRequestService],
  controllers: [ClientSupportRequestController, ManagerSupportRequestController],
  exports: [SupportRequestService],
})
export class SupportModule {}
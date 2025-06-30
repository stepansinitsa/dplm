import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SupportRequest, SupportRequestDocument } from '../schemas/support-request.schema';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class SupportRequestService implements ISupportRequestService, OnModuleInit, OnModuleDestroy {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  onModuleInit() {
    this.server = new Server(3001);
  }

  onModuleDestroy() {
    this.server.close();
  }

  async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel.find().exec();
  }

  async sendMessage(data: any): Promise<Message> {
    const message = new this.messageModel(data);
    await message.save();

    const request = await this.supportRequestModel.findById(data.supportRequest);
    request.messages.push(message._id);
    await request.save();

    this.server.emit('chatMessage', request, message);

    return message.toObject();
  }

  async getMessages(supportRequestId: string): Promise<Message[]> {
    return this.messageModel.find({ supportRequest: supportRequestId }).exec();
  }

  async markMessagesAsRead(data: MarkMessagesAsReadDto): Promise<void> {
    const { user, supportRequest, createdBefore } = data;

    await this.messageModel.updateMany(
      {
        supportRequest,
        author: { $ne: user },
        readAt: null,
        createdAt: { $lt: createdBefore },
      },
      { readAt: new Date() },
    ).exec();
  }

  async closeRequest(id: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }

  subscribe(handler: (request: SupportRequest, message: Message) => void): () => void {
    this.server.on('chatMessage', handler);
    return () => this.server.off('chatMessage', handler);
  }
}
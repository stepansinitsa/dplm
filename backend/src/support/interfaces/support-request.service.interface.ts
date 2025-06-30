import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../schemas/message.schema';

export interface CreateSupportRequestDto {
  user: string;
  text: string;
}

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
}

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: any): Promise<Message>;
  getMessages(supportRequestId: string): Promise<Message[]>;
  subscribe(handler: (request: SupportRequest, message: Message) => void): () => void;
  markMessagesAsRead(data: any): Promise<void>;
  closeRequest(id: string): Promise<void>;
}
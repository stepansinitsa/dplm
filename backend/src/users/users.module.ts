import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UsersController],
  exports: [MongooseModule]
})
export class UsersModule {}
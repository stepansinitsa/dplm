import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../users/services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [UserService],
})
export class AuthModule {}
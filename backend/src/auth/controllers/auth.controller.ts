import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express-session';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '../../users/services/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    req.session.user = user;
    return user;
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.session.destroy((err) => {});
    res.clearCookie('connect.sid');
    return { success: true };
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }
}
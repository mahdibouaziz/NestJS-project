import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userSevice: UserService) {}

  @Post('register')
  async register(@Body() userSubscribeDto: UserSubscribeDto) {
    return await this.userSevice.register(userSubscribeDto);
  }

  @Post('login')
  async login(@Body() loginCredentials: LoginCredentialsDto) {
    return await this.userSevice.login(loginCredentials);
  }
}

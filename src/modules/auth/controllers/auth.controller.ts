import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() LoginUserDto: LoginDto) {
    return this.authService.login(LoginUserDto.username, LoginUserDto.password);
  }
}

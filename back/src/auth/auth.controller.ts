import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUpController(@Body() user: CreateUserDto) {
    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden')
    }

    return await this.authService.signUpService(user)
  }

  @Post('signin')
  async signInController(@Body() user: LoginUserDto) {
    return await this.authService.signInService(user.email, user.password)
  }
}

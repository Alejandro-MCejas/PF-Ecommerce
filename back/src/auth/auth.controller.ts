import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request, Response } from 'express';

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

  @Get('login')
  async loginAuth0Controller(@Res() res: Response) {
    const loginUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?client_id=${process.env.AUTH0_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/auth/callback&scope=openid profile email`
    res.redirect(loginUrl)
  }

  @Get('logout')
  logoutAuth0Controller(@Res() res: Response) {
    const auth0LogoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_BASE_URL}`;
    res.redirect(auth0LogoutUrl);
  }

  @Get('profile')
  async profileAuth0Controller(@Req() request: Request) {

    const { idToken, accessToken } = request.oidc

    if (!idToken && !accessToken) {
      throw new UnauthorizedException('Usuario no autenticado, token no encontrado');
    }

    if (idToken) {
      const user = request.oidc.user;
      return { user, token: idToken };
    }

    throw new UnauthorizedException('Token inválido o no disponible');
  }

  @Get('callback')
  async callbackAuth0Controller(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;

    if (!code) {
      throw new BadRequestException('Código de autorización no recibido');
    }

    try {
      const tokenResponse = await this.authService.exchangeCodeForTokenService(code);

      const userProfile = await this.authService.getUserProfileService(tokenResponse.access_token);

      const jwtToken = await this.authService.generateJwtTokenAuth0Service(userProfile);

      res.redirect(`http://localhost:3000/?token=${jwtToken}`);
    }
    catch (error) {
      console.error('Error en el callback:', error);
      res.redirect('http://localhost:3000/?error=callback_failed');
    }
  }
}

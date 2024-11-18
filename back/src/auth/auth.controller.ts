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
    console.log('HOLA DESDE LOGIN')
    const loginUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?client_id=${process.env.AUTH0_CLIENT_ID}&response_type=code&redirect_uri=${process.env.AUTH0_BASE_URL}/auth/callback&scope=openid profile email`;
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
    console.log(`Este es el idToken: ${idToken}`)
    console.log(`Este es el accessToken: ${accessToken}`)

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
    console.log('HOLA DESDE CALLBACK')
    const code = req.query.code as string;
    console.log(code)

    if (!code) {
      throw new BadRequestException('Código de autorización no recibido');
    }

    console.log('Código de autorización recibido:', code);

    try {
      const tokenResponse = await this.authService.exchangeCodeForTokenService(code);
      console.log(tokenResponse)

      const userProfile = await this.authService.getUserProfileService(tokenResponse.access_token);
      console.log(userProfile)

      const jwtToken = await this.authService.generateJwtTokenAuth0Service(userProfile);
      console.log(jwtToken)

      return {
        user: userProfile,
        token: jwtToken
      }

    }
    catch (error) {
      console.error('Error en el callback:', error);
      res.redirect('http://localhost:3000/?error=callback_failed');
    }
  }
}

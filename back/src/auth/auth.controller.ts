import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
    const loginUrl = this.authService.getLoginAuth0UrlService()
    res.redirect(loginUrl)
  }

  @Get('logout')
  logoutAuth0Controller(@Res() res: Response) {
    const auth0LogoutUrl = this.authService.getLogouAuth0UrlService()
    res.redirect(auth0LogoutUrl);
  }

  @Get('profile')
  async profileAuth0Controller(@Req() req: Request) {
    const { idToken } = req.oidc

    const user = req.oidc?.user;
    return { user, idToken };
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

      let user = await this.authService.findUserByEmailOrSubService(userProfile.email, userProfile.sub);

      let isDataComplete = true;

      if (!user) {
        const newUser = this.authService.createDefaultUser(userProfile);
        user = await this.authService.signUpService(newUser);
        isDataComplete = false;
      } else if (!this.authService.isUserDataCompleteService(user)) {
        isDataComplete = false;
      }

      if (user && !user.sub) {
        await this.authService.updateUserSubService(user.id, userProfile.sub);
      }


      const jwtToken = await this.authService.generateJwtTokenAuth0Service(userProfile);
      console.log(jwtToken)

      const userSession = {
        token: jwtToken,
        userData: {
          ...user,
          isDataComplete
        }
      };


      const userSessionEncoded = encodeURIComponent(JSON.stringify(userSession));
      res.redirect(`http://localhost:4000/dashboard?userSession=${userSessionEncoded}`);
    }
    catch (error) {
      console.error('Error en el callback:', error);
      res.redirect('http://localhost:3000/?error=callback_failed');
    }
  }
}

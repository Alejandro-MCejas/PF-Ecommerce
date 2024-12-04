import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly notificationService: NotificationsService
    ) { }


    async signUpService(user: CreateUserDto) {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.usersService.createUserService(user)

        try {
            await this.notificationService.sendEmailService(
                newUser.email,
                'Confirmación de cuenta',
                'email/register-notification',
                { nombre: newUser.name }
            )
        } catch (error) {
            console.log('Error al enviar el correo de confirmación:', error);
        }

        return newUser
    }


    async signInService(email: string, password: string) {
        const user = await this.usersService.findUserByEmailService(email)

        if (!user) {
            throw new UnauthorizedException('Email o contraseña incorrectos')
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Email o contraseña incorrectos')
        }

        const token = await this.createToken(user)

        delete user.password

        return { token, user }
    }


    private async createToken(user: Users) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.admin
        }

        const token = await this.jwtService.signAsync(payload)
        return token
    }

    getLoginAuth0UrlService() {
        return `https://${process.env.AUTH0_DOMAIN}/authorize?client_id=${process.env.AUTH0_CLIENT_ID}&response_type=code&redirect_uri=${process.env.AUTH0_BASE_URL}/auth/callback&scope=openid profile email`;
    }

    getLogouAuth0UrlService() {
        return `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_BASE_URL}`;
    }

    async exchangeCodeForTokenService(code: string) {
        const response = await firstValueFrom(this.httpService.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            grant_type: 'authorization_code',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3000/auth/callback'
        }))

        return response.data
    }

    async getUserProfileService(accesToken: string) {
        const response = await firstValueFrom(this.httpService.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accesToken}`
            }
        }))

        return response.data
    }

    async findUserByEmailOrSubService(email: string, sub: string) {
        return await this.usersService.findUserByEmailOrSubService(email, sub);
    }

    createDefaultUser(userProfile: any): CreateUserDto {
        console.log(`Este es el sub: ${userProfile.sub}`);
        return {
            name: userProfile.name,
            email: userProfile.email,
            password: 'defaultPassword123',
            confirmPassword: 'defaultPassword123',
            address: '',
            phone: '',
            sub: userProfile.sub
        };
    }

    isUserDataCompleteService(user: Users): boolean {
        return !!user.phone && !!user.address;
    }

    async updateUserSubService(userId: string, sub: string): Promise<void> {
        await this.usersService.updateUserService(userId, { sub });
    }


    async generateJwtTokenAuth0Service(userProfile) {
        const payload = {
            email: userProfile.email,
            sub: userProfile.sub,
            name: userProfile.name,
        }

        return this.jwtService.sign(payload)
    }

    async forgotPasswordService(email: string) {
        const user = await this.usersService.findUserByEmailService(email)

        if (!user) {
            return
        }

        const resetToken = this.jwtService.sign(
            { id: user.id },
            { secret: process.env.JWT_RESET_SECRET, expiresIn: '15m' }
        )

        console.log(resetToken);
        

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

        try {
            await this.notificationService.sendEmailService(
                user.email,
                'Restablecer contraseña',
                'email/forgot-password-notification',
                { nombre: user.name, resetLink }
            )
        } catch (error) {
            console.log('Error at sending email:', error);
        }
    }

    async resetPasswordService(token: string, newPassword: string) {

        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_RESET_SECRET });
            const user = await this.usersService.findOneUserService(payload.id);

            if (!user) {
                throw new UnauthorizedException('Invalid token or user not found');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.usersService.updateUserService(user.id, { password: hashedPassword });

            return { message: 'Password updated successfully' };

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token or expired');
        }
    }

}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService
    ) { }


    async signUpService(user: CreateUserDto) {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.usersService.createUserService(user)

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
        console.log('Perfil del usuario:', response.data);


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
}

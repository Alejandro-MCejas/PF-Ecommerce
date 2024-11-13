import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
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

}

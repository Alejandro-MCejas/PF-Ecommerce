import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Token no encontrado')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Token invalido')
        }

        return true
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        console.log('Tipo:', type, 'Token:', token);
        return type === 'Bearer' ? token : undefined
    }
}
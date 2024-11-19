import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './authGuard.guard';
import { Auth0Guard } from './auth0Guard.guard';

@Injectable()
export class HybridAuthGuard implements CanActivate {
    constructor(
        private readonly jwtGuard: AuthGuard,
        private readonly auth0Guard: Auth0Guard,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const jwtResult = await this.jwtGuard.canActivate(context);
            if (jwtResult) {
                console.log('JWT Guard OK');
                return true
            }
        } catch (error) {
            console.log('JWT Guard falló:', error.message);
        }

        try {
            const auth0Result = await this.auth0Guard.canActivate(context);
            if (auth0Result) {
                console.log('Auth0 Guard OK')
                return true
            }
        } catch (error) {
            console.log('Auth0 Guard falló:', error.message);
        }

        throw new UnauthorizedException('No se autenticó con JWT ni Auth0');
    }
}

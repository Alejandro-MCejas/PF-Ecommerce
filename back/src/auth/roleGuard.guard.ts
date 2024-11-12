import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/users/enum/role.enum";




@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler())

        if (!requiredRoles) {
            throw new UnauthorizedException('No se especificó un rol')
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        if (!user || !requiredRoles.includes(user.roles)) {
            throw new UnauthorizedException('No tienes permisos para acceder a este recurso')
        }

        return true
    }

}
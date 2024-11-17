import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";




@Injectable()
export class Auth0Guard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>()

        if(!request.oidc?.user){
            throw new UnauthorizedException('Token Auth0 no valido')
        }

        return true
    }

}
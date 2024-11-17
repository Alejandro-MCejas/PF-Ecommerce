import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "./authGuard.guard";
import { Auth0Guard } from "./auth0Guard.guard";




@Injectable()
export class HybridAuthGuard implements CanActivate {
    constructor(private readonly jwtGuard: AuthGuard, private readonly auth0Guard: Auth0Guard) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const jwtAuthResult = await this.jwtGuard.canActivate(context)

        if(jwtAuthResult) return true 

        const auth0AuthResult = await this.auth0Guard.canActivate(context)

        if(auth0AuthResult) return true

        return false
    }

}
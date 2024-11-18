import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard } from './authGuard.guard';
import { Auth0Guard } from './auth0Guard.guard';
import { HybridAuthGuard } from './hybridAuthGuard.guard';


@Global()
@Module({
  imports: [UsersModule, SharedModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, Auth0Guard, HybridAuthGuard],
  exports: [AuthGuard, Auth0Guard, HybridAuthGuard]
})
export class AuthModule { }

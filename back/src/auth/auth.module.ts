import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SharedModule } from 'src/shared-module/shared-module.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, SharedModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

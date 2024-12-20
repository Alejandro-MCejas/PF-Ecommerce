import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from './users.repository';
import { UsersSeed } from 'src/seed/users/users.seed';
import { Products } from 'src/entities/products.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  imports: [TypeOrmModule.forFeature([Users, Products]), NotificationsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersSeed],
  exports: [UsersService, UsersRepository]
})
export class UsersModule { }

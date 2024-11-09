import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  async findAllUsersController() {
    return await this.usersService.findAllUsersService();
  }

  @Get(':id')
  async findOneUserController(@Param('id') id: string) {
    return await this.usersService.findOneUserService(id);
  }

  @Post()
  async createUserController(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUserService(createUserDto);
  }

  @Put(':id')
  async updateUserController(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUserService(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserController(@Param('id') id: string) {
    return await this.usersService.deleteUserService(id);
  }
}

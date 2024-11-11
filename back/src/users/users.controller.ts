import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  async findAllUsersController(@Res() res: Response) {
    const users = await this.usersService.findAllUsersService();
    return res.status(200).json(users);
  }

  @Get(':id')
  async findOneUserController(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOneUserService(id);
    return res.status(200).json(user)
  }

  @Post()
  async createUserController(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.usersService.createUserService(createUserDto);
    return res.status(201).json(newUser);
  }

  @Put(':id')
  async updateUserController(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const updatedUser = await this.usersService.updateUserService(id, updateUserDto);
    return res.status(200).json({ message: `El usuario con el id: ${updatedUser.id} ha sido actualizado` });
  }

  @Delete(':id')
  async deleteUserController(@Param('id') id: string, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteUserService(id);
    return res.status(200).json({ message: `El usuario ${deletedUser.name} ha sido eliminado` })
  }
}

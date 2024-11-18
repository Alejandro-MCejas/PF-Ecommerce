import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/authGuard.guard';
import { RoleGuard } from 'src/auth/roleGuard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from './enum/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  // @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async findAllUsersController(@Res() res: Response) {
    const users = await this.usersService.findAllUsersService();
    return res.status(200).json(users);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(AuthGuard)
  async updateUserController(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const updatedUser = await this.usersService.updateUserService(id, updateUserDto);
    return res.status(200).json({ message: `El usuario con el id: ${updatedUser.id} ha sido actualizado` });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteUserController(@Param('id') id: string, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteUserService(id);
    return res.status(200).json({ message: `El usuario ${deletedUser.name} ha sido eliminado` })
  }
}

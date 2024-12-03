import { Controller, Get, Post, Body, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { RoleGuard } from 'src/auth/roleGuard.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from './enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HybridAuthGuard } from 'src/auth/hybridAuthGuard.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  // @UseGuards(HybridAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
  async findAllUsersController(@Res() res: Response) {
    const users = await this.usersService.findAllUsersService();
    return res.status(200).json(users);
  }

  @Get(':id/favorites')
  async findAllFavoritesProductsController(@Param('id') userId: string, @Res() res: Response) {
    const favoriteProducts = await this.usersService.findAllFavoritesProductsService(userId);
    return res.json(favoriteProducts);
  }

  @Post(':id/favorites/:productId')
  async addFavoriteProductController(@Param('id') userId: string, @Param('productId') productId: string, @Res() res: Response) {
    const favoriteProduct = await this.usersService.addFavoriteProductService(userId, productId);
    return res.json({ message: `The product ${favoriteProduct.name} was added to favorites` });
  }

  @Delete(':id/favorites/:productId')
  async removeFavoriteProductController(@Param('id') userId: string, @Param('productId') productId: string, @Res() res: Response) {
    const favoriteProduct = await this.usersService.removeFavoriteProductService(userId, productId);
    return res.json({ message: `The product ${favoriteProduct.name} was removed from favorites` });
  }
  
  @Get(':id')
  // @UseGuards(HybridAuthGuard, RoleGuard)
  // @Roles(UserRole.ADMIN)
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
  // @UseGuards(HybridAuthGuard)
  async updateUserController(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const updatedUser = await this.usersService.updateUserService(id, updateUserDto);
    return res.status(200).json({ message: `El usuario con el id: ${updatedUser.id} ha sido actualizado` });
  }

  @Delete(':id')
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteUserController(@Param('id') id: string, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteUserService(id);
    return res.status(200).json({ message: `El usuario ${deletedUser.name} ha sido eliminado` })
  }
}

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
  @UseGuards(HybridAuthGuard)
  async findAllFavoritesProductsController(@Param('id') userId: string, @Res() res: Response) {
    const favoriteProducts = await this.usersService.findAllFavoritesProductsService(userId);
    return res.json(favoriteProducts);
  }

  @Post(':id/favorites/:productId')
  @UseGuards(HybridAuthGuard)
  async addFavoriteProductController(@Param('id') userId: string, @Param('productId') productId: string, @Res() res: Response) {
    const favoriteProduct = await this.usersService.addFavoriteProductService(userId, productId);
    return res.json({ message: `The product ${favoriteProduct.name} was added to favorites` });
  }

  @Delete(':id/favorites/:productId')
  @UseGuards(HybridAuthGuard)
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

  @Post(':id/claim/:productId')
  @UseGuards(HybridAuthGuard)
  async claimProductController(@Param('id') userId: string, @Param('productId') productId: string, @Res() res: Response) {
    const claimedProduct = await this.usersService.claimProductService(userId, productId);
    return res.json({ message: `The product ${claimedProduct.name} was claimed` })
  }

  @Post()
  async createUserController(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.createUserService(createUserDto);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error)
    }
  }

  @Put(':id')
  @UseGuards(HybridAuthGuard)
  async updateUserController(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
      @Res() res: Response
  ) {
      const updatedUser = await this.usersService.updateUserService(id, updateUserDto);
  
      // Devuelve directamente el usuario actualizado en la respuesta
      return res.status(200).json(updatedUser);
  }
  

  @Delete(':id')
  @UseGuards(HybridAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteUserController(@Param('id') id: string, @Res() res: Response) {
    const deletedUser = await this.usersService.deleteUserService(id);
    return res.status(200).json({ message: `El usuario ${deletedUser.name} ha sido eliminado` })
  }
}

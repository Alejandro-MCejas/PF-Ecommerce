import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUserService(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUserRepository(createUserDto)
  }

  async findAllUsersService() {
    return await this.usersRepository.findUsersRepository()
  }

  async findOneUserService(id: string) {
    return await this.usersRepository.findOneUserRepository(id)
  }

  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.updateUserRepository(id, updateUserDto)
  }

  async removeUserService(id: string) {
    return await this.usersRepository.deleteUserRepository(id)
  }
}


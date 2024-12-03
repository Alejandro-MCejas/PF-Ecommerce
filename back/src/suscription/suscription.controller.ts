import { BadRequestException, Body, Controller, Get,Param, Post } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { Products } from 'src/entities/products.entity';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';

@Controller('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Get(':userId')
  async suscription(@Param('userId') userId:string): Promise<Products[]>{
    return await this.suscriptionService.getSuscription(userId)
  }

  @Post('create')
  async createSuscription(@Body() createSuscriptionDto: CreateSuscriptionDto) {
    return await this.suscriptionService.createSuscription(createSuscriptionDto);
  }

  @Post('cancel/:userId')
    async cancelSubscription(@Param('userId') userId: string): Promise<{ message: string }> {
        if (!userId) {
            throw new BadRequestException('userId is required');
        }

        try {
            const result = await this.suscriptionService.cancelSuscription(userId);
            return { message: result };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

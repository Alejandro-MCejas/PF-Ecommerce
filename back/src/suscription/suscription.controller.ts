import { BadRequestException, Body, Controller, Delete, Get,Param, Post, Res,} from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipes';
import { Response } from 'express';

@Controller('suscription')
export class SuscriptionController {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Get(':userId')
  async suscription(@Param('userId') userId:string){
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

  @Delete('delete/:userId/:suscriptionId')
  async deleteSuscripcion(
    @Param('userId', UUIDValidationPipe) userId: string,
    @Param('suscriptionId', UUIDValidationPipe) suscriptionId: string,
    @Res() res: Response
  ): Promise<Response> {
    try {
      await this.suscriptionService.darDeBaja(userId, suscriptionId);
      return res.status(200).json({ message: `The subscription with id ${suscriptionId} was successfully deleted` });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

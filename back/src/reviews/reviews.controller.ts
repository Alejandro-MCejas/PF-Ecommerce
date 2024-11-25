import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from 'src/entities/reviews.entity';
import { UUIDValidationPipe } from 'src/validator/uuid-validation.pipes';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async addReviews(
    @Body() reviewData: { productId: string; userId: string; rating?: number; comment?: string }
  ): Promise<Reviews> {
    return await this.reviewsService.addReviews(reviewData.productId, reviewData.userId, reviewData.rating, reviewData.comment);
  }

  @Get(':productId/user/:userId')
  async getUserReview(
      @Param('productId') productId: string,
      @Param('userId') userId: string
  ): Promise<{ rating: number; comment?: string } | null> {
      console.log('productId:', productId, 'userId:', userId);
      const review = await this.reviewsService.ratingUser(productId, userId);
      return review ? { rating: review.rating, comment: review.comment } : null;
  }

  @Get(':productId/average')
  async getAverageRating(@Param('productId') productId: string): Promise<{ averageRating: number }> {
      const averageRating = await this.reviewsService.ratingCalculate(productId);
      return { averageRating };
  }

  @Delete('delete/:id')
  async reviewDelete(@Param('id', UUIDValidationPipe) id:string):Promise<{ message: string }>{
    const deleteId = await this.reviewsService.deleteReviews(id)
    return {message: `The reviews id ${deleteId.id}was successfully deleted`}
  }
}

import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from 'src/entities/reviews.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async addReviews(
    @Body() reviewData: { productId: string; userId: string; rating: number; comment?: string }
  ): Promise<Reviews> {
    return await this.reviewsService.addReviews(reviewData.productId, reviewData.userId, reviewData.rating, reviewData.comment);
  }

  @Get(':productId/user/:userId')
  async getUserReview(
      @Param('productId') productId: string,
      @Param('userId') userId: string
  ): Promise<{ rating: number; comment?: string } | null> {
      const review = await this.reviewsService.ratingUser(productId, userId);
      return review ? { rating: review.rating, comment: review.comment } : null;
  }

  @Get(':productId/average')
  async getAverageRating(@Param('productId') productId: string): Promise<{ averageRating: number }> {
      const averageRating = await this.reviewsService.ratingCalculate(productId);
      return { averageRating };
  }
}

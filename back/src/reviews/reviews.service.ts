import { Injectable } from '@nestjs/common';
import { Reviews } from 'src/entities/reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Reviews) private readonly reviewsRpository: Repository<Reviews>){}
  
  async addReviews(productsId:string, userId:string, rating:number, comment:string): Promise<Reviews> {
    const newReview = this.reviewsRpository.create({
      products: {id: productsId},
      user: {id: userId},
      rating,
      comment,
    });
    return await this.reviewsRpository.save(newReview);
  }

  async getReviewsProdcuts(productsId: string):Promise<Reviews[]> {
    return await this.reviewsRpository.find({
      where:{products:{id: productsId}},
      relations: ['user'],
    })
  }

  async ratingCalculate(productsId:string):Promise<number>{
    const reviews = await this.getReviewsProdcuts(productsId);
    if(reviews.length === 0) return 0;
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    const promedioRating = totalRating / reviews.length;
    return promedioRating;
  }

  async ratingUser(productsId:string, userId: string): Promise<Reviews | undefined>{
    console.log('Buscando reseña:', { productsId, userId });
    const reviews = await this.reviewsRpository.findOne({
      where: {products :{id: productsId}, user: {id: userId}},
      relations: ['products', 'user'],
    });
    console.log(reviews)
    return reviews;
  }
  
}

import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from 'src/auth/authGuard.guard';

@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
        const imageUrls = [];
        if (files && files.length > 0) {
        for (const file of files) {
            const uploadedImage = await this.cloudinaryService.uploadImage(file);
            imageUrls.push(uploadedImage.secure_url);
        }
        }
        return { imageUrls };
    }
}

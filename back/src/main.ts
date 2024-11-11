import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsSeed } from './seed/products/products.seed';
import { CategoriesSeed } from './seed/products/categories/categories.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS antes de ejecutar el seeding
  app.enableCors({
    origin: 'http://localhost:4000', // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true // Permite cookies u otros headers de autenticación
  });

  // Ejecuta el seeding después de configurar CORS
  const cateoriesSeed = app.get(CategoriesSeed);
  await cateoriesSeed.categoriesSeed();
  
  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seedProducts();
  
  await app.listen(3000);
}

bootstrap();

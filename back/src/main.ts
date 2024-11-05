import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsSeed } from './seed/products/products.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();

  await app.listen(3000);
}
bootstrap();

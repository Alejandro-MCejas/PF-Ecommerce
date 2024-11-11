import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsSeed } from './seed/products/products.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS antes de ejecutar el seeding
  app.enableCors({
    origin: 'http://localhost:4000', // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true // Permite cookies u otros headers de autenticación
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Api Proyecto Final')
    .setDescription('Ecommerce de proyecto final 2024')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('API', app, document)


  // Ejecuta el seeding después de configurar CORS
  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seed();

  await app.listen(3000);
}

bootstrap();

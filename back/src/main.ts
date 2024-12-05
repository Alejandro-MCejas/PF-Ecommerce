import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsSeed } from './seed/products/products.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seed/users/users.seed';
import { CategoriesSeed } from './seed/categories/categories.seed';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0';
import { loggerGlobal } from './middlewares/loggerGlobal.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configura CORS antes de ejecutar el seeding
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4000', 'https://pf-ecommerce2024.vercel.app'], // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite cookies u otros headers de autenticación
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    exposedHeaders: ['Authorization'], // Encabezados expuestos al cliente
  });
  
  app.use(loggerGlobal)
  app.use(auth({
    ...auth0Config,
    routes: {
      login: false,
      logout: false,
      callback: false
    },
  }))


  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Api Proyecto Final')
    .setDescription('Ecommerce de proyecto final 2024')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('API', app, document)


  // Ejecuta el seeding después de configurar CORS
  const cateoriesSeed = app.get(CategoriesSeed);
  await cateoriesSeed.seedCategories();

  const productsSeed = app.get(ProductsSeed);
  await productsSeed.seedProducts();

  const userSeed = app.get(UsersSeed)
  await userSeed.seedUsers()
  console.log('Usuarios Cargados');

  await app.listen(3000);

}

bootstrap();

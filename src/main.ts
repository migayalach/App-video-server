import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeederService } from './seeders/initial-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);
  await seederService.seed();
  const config = new DocumentBuilder()
    .setTitle('Server video')
    .setDescription('The server video API')
    .setVersion('1.0')
    .addTag('Video server documentation')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('app-video', app, documentFactory);
  app.setGlobalPrefix('app-video');
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://miapp.vercel.app',
    ],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Authorization, Content-Type',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

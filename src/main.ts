import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so frontend can call backend
  app.enableCors({
    origin: 'http://localhost:3000', // your Next.js dev server
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

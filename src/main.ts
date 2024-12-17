import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS for WebSocket and HTTP requests
  app.enableCors({
    origin: '*', // Allow all origins (replace with specific origin in production)
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Accept',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on: https://test-chatapp-b09g.onrender.com`);
  });
}

bootstrap();

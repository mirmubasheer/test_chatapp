import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development and production environments
  app.enableCors({
    origin: '*', // For testing purposes, you can allow all origins
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  

  // Use the port from the environment variable, default to 3000 for local development
  const port = process.env.PORT || 3000;

  // Listen on all interfaces for accessibility
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();

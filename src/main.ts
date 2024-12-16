import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development and production environments
  app.enableCors({
    origin: ['http://test-chatapp-b09g.onrender.com', 'http://localhost:3000'], // Adjust the origin as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  // Use the port from the environment variable, default to 3000 for local development
  const port = process.env.PORT || 3000;

  // Listen on all interfaces for accessibility
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();

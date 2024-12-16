import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Allow CORS for development and production environments
  app.enableCors();
  
  // Use the port from the environment variable, default to 3000 for local development
  const port = process.env.PORT || 3000;
  
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para desarrollo y producción
  app.enableCors({
    origin: [
      'http://localhost:3000', // desarrollo
      'https://english-up-gamma.vercel.app', // producción
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Backend corriendo en puerto ${port}`);
}
bootstrap();

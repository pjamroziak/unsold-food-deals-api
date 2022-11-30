import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const config = new ConfigService();

  const port = Number(config.get('APP_PORT'));
  const globalPrefix = config.get('APP_GLOBAL_PREFIX');

  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { bufferLogs: true },
  );

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port, '0.0.0.0');
}

bootstrap();

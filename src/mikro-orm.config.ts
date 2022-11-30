import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { ConfigService } from '@nestjs/config';

const getConfig = (): Options => {
  const configService = new ConfigService();

  return {
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    user: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    dbName: configService.get('DB_NAME'),
    type: 'postgresql',
    entities: ['./dist/entities/**/*.js'],
    entitiesTs: ['./entities/**/*.ts'],
    migrations: {
      snapshot: false,
    },
    metadataProvider: TsMorphMetadataProvider,
  };
};

export default getConfig();

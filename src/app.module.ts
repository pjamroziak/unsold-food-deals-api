import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { dbConfig } from './configs/db.config';
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    ApiModule,
  ],
})
export class AppModule {}

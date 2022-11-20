import { ravenDbConfig } from '@app/configs/ravendb.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RavenDbService } from './ravendb.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ravenDbConfig],
    }),
  ],
  providers: [RavenDbService],
  exports: [RavenDbService],
})
export class RavenDbModule {}

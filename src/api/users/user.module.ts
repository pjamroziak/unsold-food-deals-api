import { RavenDbModule } from '@app/ravendb/ravendb.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [RavenDbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

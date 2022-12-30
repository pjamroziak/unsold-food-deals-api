import { City } from '@app/entities/city.entity';
import { User } from '@app/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CityFinderService } from '../cities/city-finder.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, City] })],
  controllers: [UserController],
  providers: [UserService, CityFinderService],
})
export class UserModule {}

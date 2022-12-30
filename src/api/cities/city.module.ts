import { City } from '@app/entities/city.entity';
import { User } from '@app/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { Offer } from '@app/entities/offer.entity';
import { CityOffersService } from './city-offers.service';
import { CityOffersController } from './city-offers.controller';
import { CityFinderService } from './city-finder.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, City, Offer] })],
  controllers: [CityController, CityOffersController],
  providers: [CityService, CityOffersService, CityFinderService],
  exports: [CityFinderService],
})
export class CityModule {}

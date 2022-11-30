import { Module } from '@nestjs/common';
import { CityModule } from './cities/city.module';
import { OfferModule } from './offers/offer.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [CityModule, UserModule, OfferModule],
})
export class ApiModule {}

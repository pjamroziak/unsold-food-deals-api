import { City } from '@app/entities/city.entity';
import { Offer } from '@app/entities/offer.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [City, Offer] })],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}

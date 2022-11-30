import { City } from '@app/entities/city.entity';
import { Offer } from '@app/entities/offer.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from '../offers/dto/create-offer.dto';

@Injectable()
export class CityOffersService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
    @InjectRepository(Offer)
    private readonly offerRepository: EntityRepository<Offer>,
  ) {}

  async findAll(cityId: number) {
    return this.offerRepository.find({ city: { id: cityId } });
  }

  async create(cityId: number, offerCreateDto: CreateOfferDto) {
    const city = await this.cityRepository.findOneOrFail(cityId);
    const offer = this.offerRepository.create(offerCreateDto);

    city.offers.add(offer);
    await this.cityRepository.persistAndFlush(city);

    return offer;
  }
}

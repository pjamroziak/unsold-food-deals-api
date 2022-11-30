import { City } from '@app/entities/city.entity';
import { Offer } from '@app/entities/offer.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: EntityRepository<Offer>,
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
  ) {}

  async findAll() {
    return this.offerRepository.findAll();
  }

  async update(id: number, offerUpdateDto: UpdateOfferDto) {
    const offer = await this.offerRepository.findOneOrFail({ id });

    Object.assign(offer, offerUpdateDto);
    this.offerRepository.persistAndFlush(offer);

    return offer;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from '../../entities/city.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CityFinderService } from './city-finder.service';
import { Cordinates } from '@app/common/types';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
    private readonly cityFinderService: CityFinderService,
  ) {}

  async findAll() {
    return this.cityRepository.findAll({
      fields: ['*', 'users.id'],
    });
  }

  async findById(id: number) {
    return this.cityRepository.findOneOrFail({ id });
  }

  async findClosestCity(cords: Cordinates) {
    const cities = await this.cityRepository.findAll();
    return this.cityFinderService.findClosestCity(cities, cords);
  }

  async create(locationCreateDto: CreateCityDto) {
    const user = this.cityRepository.create(locationCreateDto);
    await this.cityRepository.persistAndFlush(user);

    return user;
  }

  async remove(id: number) {
    const city = this.cityRepository.getReference(id);
    await this.cityRepository.removeAndFlush(city);
  }
}

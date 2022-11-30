import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from '../../entities/city.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
  ) {}

  async findAll() {
    return this.cityRepository.findAll({
      fields: ['*', 'users.id', 'offers.*'],
    });
  }

  async findById(id: number) {
    return this.cityRepository.findOneOrFail({ id });
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

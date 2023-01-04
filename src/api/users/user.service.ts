import { City } from '@app/entities/city.entity';
import { User } from '@app/entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CityFinderService } from '../cities/city-finder.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
    private readonly cityFinderService: CityFinderService,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return this.userRepository.findOneOrFail({ id });
  }

  async create(userCreateDto: CreateUserDto) {
    const citites = await this.getCitites();
    const foundCity = await this.cityFinderService.findClosestCity(
      citites,
      userCreateDto,
    );

    const user = this.userRepository.create({
      ...userCreateDto,
      city: foundCity,
    });
    await this.userRepository.persistAndFlush(user);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ id });

    if (
      (updateUserDto.latitude !== null &&
        user.latitude !== updateUserDto.latitude) ||
      (updateUserDto.longitude !== null &&
        user.longitude !== updateUserDto.longitude)
    ) {
      const citites = await this.getCitites();
      const foundCity = await this.cityFinderService.findClosestCity(
        citites,
        updateUserDto,
      );
      Object.assign(user, { ...updateUserDto, foundCity });
    } else {
      Object.assign(user, { ...updateUserDto });
    }

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async remove(id: number) {
    const user = this.userRepository.getReference(id);
    await this.userRepository.removeAndFlush(user);
  }

  private async getCitites() {
    return this.cityRepository.findAll({
      fields: ['latitude', 'longitude', 'id'],
    });
  }
}

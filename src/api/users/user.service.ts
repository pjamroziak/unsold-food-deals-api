import { Cordinate } from '@app/common/types';
import { City } from '@app/entities/city.entity';
import { User } from '@app/entities/user.entity';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(City)
    private readonly cityRepository: EntityRepository<City>,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return this.userRepository.findOneOrFail({ id });
  }

  async create(userCreateDto: CreateUserDto) {
    const foundCity = await this.findCityForUser(userCreateDto);

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
      const city = await this.findCityForUser(updateUserDto);
      Object.assign(user, { ...updateUserDto, city });
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

  private async findCityForUser(partialUser: Partial<User>) {
    const cities = await this.cityRepository.findAll();
    if (cities.length === 0) {
      return null;
    }

    const mappedDistances = cities.map((city) => ({
      city,
      distance: this.getDistanceBetweenUserAndLocation(partialUser, city),
    }));

    const smallestDistanceCity = mappedDistances.reduce((prev, curr) => {
      return prev.distance < curr.distance ? prev : curr;
    });

    if (smallestDistanceCity.distance - smallestDistanceCity.city.radius > 0) {
      return null;
    }

    return smallestDistanceCity.city;
  }

  private getDistanceBetweenUserAndLocation(user: Partial<User>, city: City) {
    const isLatitudeEqual = user.latitude === city.latitude;
    const isLongitudeEqual = city.longitude === city.longitude;
    const isCordinatesEqual = isLatitudeEqual && isLongitudeEqual;

    if (isCordinatesEqual) {
      return 0;
    }

    const userRadLatitude = (Math.PI * user.latitude) / 180;
    const locationRadLatitude = (Math.PI * city.latitude) / 180;

    const theta = user.longitude - city.longitude;
    const radtheta = (Math.PI * theta) / 180;

    let distance =
      Math.sin(userRadLatitude) * Math.sin(locationRadLatitude) +
      Math.cos(userRadLatitude) *
        Math.cos(locationRadLatitude) *
        Math.cos(radtheta);

    if (distance > 1) {
      distance = 1;
    }

    distance = (Math.acos(distance) * 180) / Math.PI;
    const miles = distance * 60 * 1.1515;
    const kilometers = miles * 1.609344;

    return kilometers;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOfferDto } from '../offers/dto/create-offer.dto';
import { CityOffersService } from './city-offers.service';

@Controller('cities/:cityId/offers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CityOffersController {
  constructor(private readonly cityOffersService: CityOffersService) {}

  @Get()
  async getAll(@Param('cityId') cityId: number) {
    return this.cityOffersService.findAll(cityId);
  }

  @Post()
  async add(
    @Param('cityId') cityId: number,
    @Body() offerCreateDto: CreateOfferDto,
  ) {
    return this.cityOffersService.create(cityId, offerCreateDto);
  }
}

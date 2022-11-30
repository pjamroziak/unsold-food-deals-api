import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferService } from './offer.service';

@Controller('offers')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  async getAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.offerService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offerService.update(id, updateOfferDto);
  }
}

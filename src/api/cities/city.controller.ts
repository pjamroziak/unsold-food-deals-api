import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CityService } from './city.service';

@Controller('cities')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CityController {
  constructor(private readonly locationsService: CityService) {}

  @Get()
  async getAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async getBydId(@Param('id') id: number) {
    return this.locationsService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateCityDto) {
    return this.locationsService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.locationsService.remove(id);
  }
}

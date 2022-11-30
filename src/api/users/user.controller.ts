import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() userCreateDto: CreateUserDto) {
    await this.userService.create(userCreateDto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}

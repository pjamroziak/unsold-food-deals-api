import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, Notification } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/')
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Post('/')
  async create(@Body() user: User) {
    return await this.service.create(user);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() user: Partial<User>) {
    return await this.service.update(id, user);
  }

  @Put('/:id/notifications')
  async addNotifications(
    @Param('id') id: string,
    @Body() notifications: Notification[],
  ) {
    return await this.service.update(id, { notifications });
  }
}

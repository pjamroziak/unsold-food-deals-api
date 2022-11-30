import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  telegramChatId: string;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;
}

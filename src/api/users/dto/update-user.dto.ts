import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  telegramChatId: string;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsNumber()
  @IsOptional()
  latitude: number;
}

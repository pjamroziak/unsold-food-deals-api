import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  restaurant_id: number;

  @IsNumber()
  package_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  logoUrl: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  old_price: number;

  @IsNumber()
  new_price: number;

  @IsDateString()
  opened_at: Date;

  @IsDateString()
  closed_at: Date;
}

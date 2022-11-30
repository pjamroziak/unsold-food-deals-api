import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOfferDto {
  @IsNumber()
  @IsOptional()
  package_id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  logoUrl: string;

  @IsNumber()
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsOptional()
  old_price: number;

  @IsNumber()
  @IsOptional()
  new_price: number;

  @IsDate()
  @IsOptional()
  opened_at: Date;

  @IsDate()
  @IsOptional()
  closed_at: Date;
}

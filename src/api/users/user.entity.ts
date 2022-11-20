import { RavenDbModel } from '@app/ravendb/ravendb.model';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Location {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class Notification {
  @IsNumber()
  restaurantId: number;

  @IsNumber()
  packageId: number;

  @IsNumber()
  stock: number;
}

export class User extends RavenDbModel {
  @IsString()
  id: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @IsBoolean()
  @IsOptional()
  notify: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Notification)
  notifications: Notification[];
}

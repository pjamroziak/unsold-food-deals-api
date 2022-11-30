import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { City } from './city.entity';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  telegramChatId: string;

  @Property({
    columnType: 'float8',
  })
  latitude: number;

  @Property({
    columnType: 'float8',
  })
  longitude: number;

  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date;

  @ManyToOne({ onDelete: 'set null', nullable: true })
  city: City;
}

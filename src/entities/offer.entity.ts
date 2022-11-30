import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { City } from './city.entity';

@Entity()
export class Offer {
  @PrimaryKey()
  id: number;

  @Property()
  package_id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  logoUrl: string;

  @Property()
  stock: number;

  @Property()
  old_price: number;

  @Property()
  new_price: number;

  @Property()
  opened_at: Date;

  @Property()
  closed_at: Date;

  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date;

  @ManyToOne({ onDelete: 'cascade' })
  city: City;
}

import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Offer } from './offer.entity';
import { User } from './user.entity';

@Entity()
export class City {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({
    columnType: 'float8',
  })
  latitude: number;

  @Property({
    columnType: 'float8',
  })
  longitude: number;

  @Property()
  radius: number;

  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.city)
  users = new Collection<User>(this);

  @OneToMany(() => Offer, (offer) => offer.city)
  offers = new Collection<Offer>(this);
}

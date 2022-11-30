import { Migration } from '@mikro-orm/migrations';

export class Migration20221130105924 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "city" ("id" serial primary key, "name" varchar(255) not null, "latitude" float8 not null, "longitude" float8 not null, "radius" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );

    this.addSql(
      'create table "offer" ("id" serial primary key, "package_id" int not null, "name" varchar(255) not null, "description" varchar(255) not null, "logo_url" varchar(255) not null, "stock" int not null, "old_price" int not null, "new_price" int not null, "opened_at" timestamptz(0) not null, "closed_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "city_id" int not null);',
    );

    this.addSql(
      'create table "user" ("id" serial primary key, "telegram_chat_id" varchar(255) not null, "latitude" float8 not null, "longitude" float8 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "city_id" int null);',
    );

    this.addSql(
      'alter table "offer" add constraint "offer_city_id_foreign" foreign key ("city_id") references "city" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "user" add constraint "user_city_id_foreign" foreign key ("city_id") references "city" ("id") on update cascade on delete set null;',
    );
  }
}

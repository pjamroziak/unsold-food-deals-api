import { RavenDbService } from '@app/ravendb/ravendb.service';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly store: RavenDbService) {}

  async getAll() {
    return await this.store.getAll<User>('Users');
  }

  async getById(id: string) {
    return await this.store.get<User>('Users', {
      fieldName: 'id',
      value: id,
      allowWildcards: false,
      nestedPath: false,
      exact: undefined,
    });
  }

  async create(user: User) {
    return this.store.create(user);
  }

  async update(id: string, partial: Partial<User>) {
    return this.store.update(id, partial);
  }
}

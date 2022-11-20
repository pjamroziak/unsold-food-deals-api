import { RavenDbConfig, RavenDbConfigKey } from '@app/configs/ravendb.config';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import DocumentStore, { IAuthOptions, WhereParams } from 'ravendb';
import { RavenDbModel } from './ravendb.model';

@Injectable()
export class RavenDbService implements OnModuleInit {
  private readonly logger = new Logger(RavenDbService.name);

  private store: DocumentStore;

  constructor(
    @Inject(RavenDbConfigKey)
    private readonly config: RavenDbConfig,
  ) {}

  onModuleInit() {
    const authOptions: IAuthOptions = {
      type: 'pfx',
      certificate: Buffer.from(this.config.certBase64, 'base64'),
    };

    this.store = new DocumentStore(
      this.config.url,
      this.config.database,
      authOptions,
    );

    this.store.initialize();
  }

  private getSession() {
    return this.store.openSession();
  }

  async getAll<T extends object>(collection: string) {
    return await this.getSession().query<T>({ collection }).all();
  }

  async get<T extends RavenDbModel>(
    collection: string,
    whereParams: WhereParams,
  ) {
    return await this.getSession()
      .query<T>({ collection })
      .whereEquals(whereParams)
      .firstOrNull();
  }

  async create(entity: RavenDbModel) {
    const session = this.getSession();

    await session.store(entity);
    await session.saveChanges();
  }

  async update(id: string, partial: Partial<RavenDbModel>) {
    const session = this.getSession();
    const current = await session.load(id);

    if (!current) {
      throw new BadRequestException(`user ${id} not found`);
    }

    Object.assign(current, partial);

    await session.saveChanges();
  }
}

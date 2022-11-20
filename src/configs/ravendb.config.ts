import { ConfigType, registerAs } from '@nestjs/config';

export const ravenDbConfig = registerAs('ravendb', () => ({
  url: process.env.RAVENDB_URL,
  database: process.env.RAVENDB_DATABASE,
  certBase64: process.env.RAVENDB_CERT_BASE64,
}));

export const RavenDbConfigKey = ravenDbConfig.KEY;

export type RavenDbConfig = ConfigType<typeof ravenDbConfig>;

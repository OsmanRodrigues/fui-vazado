import { SetupServer } from './../src/server';
import { getConnection } from 'typeorm';
import * as config from './../src/config';

(async () => {
  const server = new SetupServer(+config.getEnv('PORT'), config.getEnv('ENV'));
  await server.init();

  const connection = getConnection();
  await connection.synchronize(false);
})();

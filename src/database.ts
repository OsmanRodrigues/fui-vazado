import 'reflect-metadata';
import { createConnection, Connection, getConnection } from 'typeorm';
import { LeakEntity } from './entities/leak.entity';

interface Args {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export async function connect(args: Args): Promise<Connection> {
  return createConnection({
    type: 'postgres',
    host: args.host,
    port: args.port,
    username: args.username,
    password: args.password,
    database: args.database,
    entities: [LeakEntity],
    synchronize: true,
    logging: false,
  });
}

export function close(): Promise<void> {
  const connection = getConnection();
  return connection.close();
}

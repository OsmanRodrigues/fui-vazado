import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { LeakController } from './controllers/leak.controller';
import * as http from 'http';
import * as database from './database';
import * as config from './config';
import { Log } from './logger';

export class SetupServer extends Server {
  private readonly port: number;
  private readonly logger: Log;
  private server?: http.Server;

  constructor(port: number = 3000, environtment: string, logger: Log) {
    super(environtment === 'development'); // setting showLogs to true
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.port = port;
    this.logger = logger;
  }

  private async databaseSetup(): Promise<void> {
    await database.connect({
      host: config.getEnv('DB_HOST'),
      port: +config.getEnv('DB_PORT'),
      username: config.getEnv('DB_USERNAME'),
      password: config.getEnv('DB_PASSWORD'),
      database: config.getEnv('DB_NAME'),
    });
  }

  public async init(): Promise<void> {
    const leakController = new LeakController();
    super.addControllers([leakController]);
    await this.databaseSetup();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      this.logger.info('Server listening on port: ' + this.port);
    });
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }
}

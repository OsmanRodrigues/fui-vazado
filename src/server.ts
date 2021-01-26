import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { Server } from '@overnightjs/core';
import { LeakController } from './controllers/leak.controller';
import { PublicController } from './controllers/public.controller';
import cors from 'cors';
import * as http from 'http';
import * as database from './database';
import * as config from './config';
import { Log } from './logger';

export class SetupServer extends Server {
  private readonly port: number;
  private readonly logger: Log;
  private server?: http.Server;

  constructor(port: number = 3000, environtment?: string, logger?: Log) {
    super(environtment === 'development'); // setting showLogs to true
    this.port = port;
    this.logger = logger ?? new Log();
  }

  private async databaseSetup(): Promise<void> {
    await database.connect({
      host: config.getEnv('DB_HOST'),
      port: +config.getEnv('DB_PORT'),
      username: config.getEnv('DB_USERNAME'),
      password: config.getEnv('DB_PASSWORD'),
      database: config.getEnv('DB_NAME'),
    });
    this.logger.info('Database connected!');
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('trust proxy', true);
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  public getApp(): Application {
    return this.app;
  }

  public async init(): Promise<void> {
    this.setupExpress();
    const leakController = new LeakController();
    const publicController = new PublicController();
    super.addControllers([leakController, publicController]);
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

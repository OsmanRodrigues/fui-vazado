import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { LeakController } from './controllers/leak.controller';

export class SetupServer extends Server {
  private readonly port: number;

  constructor(port: number = 3000, environtment: string) {
    super(environtment === 'development'); // setting showLogs to true
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.port = port;
  }

  public async init(): Promise<void> {
    const leakController = new LeakController();
    super.addControllers([leakController]);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      Logger.Imp('Server listening on port: ' + this.port);
    });
  }

  public async close(): Promise<void> {
    //await database.close();
    //if (this.server) {
    //await new Promise((resolve, reject) => {
    //this.server?.close(err => {
    //if (err) {
    //return reject(err);
    //}
    //resolve();
    //});
    //});
    //}
  }
}

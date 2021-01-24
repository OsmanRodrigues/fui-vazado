import { Logger } from '@overnightjs/logger';

export class Log {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  public info(content: any) {
    this.logger.info(content);
  }

  public error(content: any) {
    this.logger.err(content);
  }
}

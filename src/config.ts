require('dotenv').config();

export class Config {
  public getEnv(env: string): string {
    const res = process.env[env];

    if (res === undefined) {
      return '';
    }

    return res;
  }
}

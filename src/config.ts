require('dotenv').config();

export function getEnv(env: string): string {
  const res = process.env[env];

  if (res === undefined) {
    return '';
  }

  return res;
}

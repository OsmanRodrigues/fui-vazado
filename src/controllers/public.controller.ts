import { Controller, Post, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import * as path from 'path';
import { Log } from '../logger';

@Controller('')
export class PublicController {
  @Post()
  @Get()
  public get(req: Request, res: Response) {
    const log = new Log();
    const theFile = path.resolve('public/client.html');
    log.info(`A new request was mathe to client.html from ${req.ip}`);

    return res.sendFile(theFile);
  }
}

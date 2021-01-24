import { Controller, Post, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';
//import { Beach } from '@src/models/beach';
//import { authMiddleware } from '@src/middlewares/auth';
//import { BaseController } from '.';

@Controller('api/checkLeak')
//@ClassMiddleware(authMiddleware) extends BaseController {
export class LeakController {
  @Post()
  public async checkLeak(req: Request, res: Response): Promise<void> {
    try {
      //const leak = await Beach.find({ user: req.decoded?.id });
      res.status(201).send({ leaked: true });
    } catch (error) {
      console.error(error.message);
      //this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}

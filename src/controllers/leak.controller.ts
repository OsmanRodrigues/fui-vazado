import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { LeakDatasource } from '../models/datasources/leak.datasource';
import { Log } from '../logger';

@Controller('api/checkLeak')
export class LeakController {
  @Post()
  public async checkLeak(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req?.body;

      if (!cpf) {
        res
          .status(400)
          .send({ message: 'You have to pass a valid CPF', code: 400 });
        return;
      }

      const datasource = new LeakDatasource();
      const leak = await datasource.findOneByCPF(cpf);

      res.status(201).send({ wasLeaked: !!leak?.cpf, leak });
    } catch (error) {
      const logger = new Log();
      logger.error(
        `Error while looking for cpf ${req?.body} in database: ${error.message}`
      );
      res.status(500).send({
        message: 'Oops, something went wrong ¯_(ツ)_/¯',
        code: 500,
      });
    }
  }
}

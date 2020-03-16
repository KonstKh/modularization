import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import DealService from './deal.service';

import { decorateRouter } from '@awaitjs/express';
import { IDealDTO } from './deal.interfaces';

const router = decorateRouter(Router());

export default (app: Router) => {
  app.use('/deal', router);

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Get deal');
    try {
      const dealService = Container.get(DealService);
      const deal = await dealService.CreateDeal(req.body as IDealDTO);
      return res.status(200).json(deal);
    } catch (err) {
      logger.error(`Deal creation error: ${err}`);
      return next(err);
    }
  });

}

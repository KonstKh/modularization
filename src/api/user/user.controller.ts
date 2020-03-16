import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import UserService from './user.service';
import { IUserDTO } from './user.intefaces';

const router = Router();

export default (app: Router) => {
  app.use('/users', router);

  // TODO: validation middleware
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('User create call', req.body);
    try {
      const userService = Container.get(UserService);
      const user = await userService.CreateUser(req.body as IUserDTO);
      return res.status(200).json({user});
    } catch(err) {
      logger.error(`User creation error: ${err}`);
      return next(err);
    }
  })

  router.get('/random', async (req: Request, res: Response) => {
    const userService = Container.get(UserService);
    const user: IUserDTO = await userService.GetRandomUser();
    const logger: Logger = Container.get('logger');
    logger.info(`user: ${user}`);
    return res.status(200).send({user});
  });

};

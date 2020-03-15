import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import UserService from './user.service';
import { IUserDTO } from './user.intefaces';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/random', async (req: Request, res: Response) => {
    const userServiceInstance = Container.get(UserService);
    const user: IUserDTO = await userServiceInstance.GetRandomUser();
    const logger: Logger = Container.get('logger');
    logger.info(`user: ${user}`);
    return res.status(200).send({user});
  });

};

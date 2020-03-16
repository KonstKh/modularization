import { Router } from 'express';
import user from './user/user.controller';
import deal from './deal/deal.controller';


export default () => {
  const app = Router();
  user(app);
  deal(app);
  return app;
}

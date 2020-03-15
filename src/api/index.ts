import { Router } from 'express';
import user from './user/user.controller';

export default () => {
  const app = Router();
  user(app);
  return app;
}

import Logger from './logger';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import models from './models';
import './events';

export default async({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB connected.');

  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      models.userModel,
      models.dealModel,
    ]
  });
  Logger.info('Dependencies loaded');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
}

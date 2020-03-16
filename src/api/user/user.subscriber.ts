import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from '../../subscribers/events';
import { Logger } from 'winston';
import { IDeal } from '../deal/deal.interfaces';

@EventSubscriber()
export default class UserSubscriber {

  @On(events.deal.created)
  public onDealCreated(owner: Partial<IDeal>) {
    const logger: Logger = Container.get('logger');
    logger.silly(`Deal created for User ${owner}`);
  }
}

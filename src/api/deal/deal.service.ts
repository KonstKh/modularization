import { Service, Inject } from 'typedi';
import { IDealDTO } from './deal.interfaces';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/eventDispatcher';
import events from '../../subscribers/events';

@Service()
export default class DealService {
  constructor(
    @Inject('dealModel') private dealModel: Models.DealModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface
  ) { }

  public async CreateDeal(dealDTO: IDealDTO) {
    try {
      this.logger.silly('Create Deal');
      const dealRecord = await this.dealModel.create(dealDTO);

      this.eventDispatcher.dispatch(events.deal.created, dealRecord.owner);

      return dealRecord.toObject();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

}

import { Service, Inject } from 'typedi';
import { IUser, IUserDTO } from './user.intefaces';


@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('logger') private logger,
) {}

  public async GetRandomUser(): Promise<IUser> {
    const userRecord = await this.userModel.findOne({}, {_id: 0, __v: 0}).exec();
    this.logger.silly(`userRecord: ${userRecord}`)
    return userRecord.toObject();
  }
}

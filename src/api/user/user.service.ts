import { Service, Inject } from 'typedi';
import { IUser, IUserDTO } from './user.intefaces';
import { getHeapStatistics } from 'v8';
import { threadId } from 'worker_threads';


@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('logger') private logger,
) {}

  public async GetRandomUser(): Promise<IUser> {
    // TODO: create 'Mapper' layer
    const userRecord = await this.userModel.findOne({}, {_id: 0, __v: 0}).exec();
    this.logger.silly(`userRecord: ${userRecord}`)
    return userRecord.toObject();
  }

  public async CreateUser(userDTO: IUserDTO): Promise<{user: IUser}> {
    try{
      const hashedPassword = 'generatedSecureHashedPassword';
      const userRecord = await this.userModel.create({
        ...userDTO,
        password: hashedPassword
      });
      if(!userRecord) {
        throw new Error('User creation error');
      }
      const user = userRecord.toObject();
      // TODO: 'Mapper' layer
      Reflect.deleteProperty(user, 'password');
      return user;
    } catch(error) {
      this.logger.error(error);
      throw error;
    }
  }
}

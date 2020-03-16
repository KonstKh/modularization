import { Document, Model } from 'mongoose';
import { IUser } from '../api/user/user.intefaces';
import { IDeal } from '../api/deal/deal.interfaces';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }
  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type DealModel = Model<IDeal & Document>;
  }
}

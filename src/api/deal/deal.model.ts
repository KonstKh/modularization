import mongoose, { Schema } from 'mongoose';
import { IDeal } from './deal.interfaces';


const Deal = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    content: String,
    owner: {
      type:  Schema.Types.ObjectId
    }
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IDeal & mongoose.Document>('Deal', Deal);

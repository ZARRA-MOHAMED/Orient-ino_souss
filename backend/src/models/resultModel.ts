import mongoose, { Document, model, Schema } from 'mongoose';
import { IResult } from '../types/resultTypes';
import { IUserSchema } from './userModel';

interface IResultSchema extends IResult, Document {
  user: IUserSchema['_id'];
  results: IResult[];
}

const resultSchema = new Schema<IResultSchema>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  results: [
    {
      diagnostique: {
        type: mongoose.Types.ObjectId,
        ref: 'Diagnostique',
        required: true,
      },
      scores: {
        type: Schema.Types.Mixed, // Can be either IRIASECScore[] or number
        required: true,
      },
    },
  ],
});

const Result = model<IResultSchema>('Result', resultSchema);

export { IResultSchema, Result };


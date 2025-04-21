import mongoose, { model, Schema, Document } from 'mongoose';
import { IBranch } from '../types/branchTypes';

interface IBranchSchema extends IBranch, Document {}

const branchSchema = new Schema<IBranchSchema>({
  title: {
    type: String,
    required: true,
  },
  filiere: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Branch = model<IBranchSchema>('Branch', branchSchema);

export { IBranchSchema, Branch };

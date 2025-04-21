import { Document, model, Schema } from 'mongoose';
import { IQuestion } from '../types/questionTypes';
import ApiError from '../utils/apiError';
import { Diagnostique } from './diagnostiqueModel';
import { DiagnostiqueName } from '../types/diagnostiqueTypes';

interface IQuestionSchema extends IQuestion, Document {}

const questionSchema = new Schema<IQuestionSchema>({
  name: { type: String, required: true },
  diagnostique: { type: Schema.Types.ObjectId, ref: 'Diagnostique', required: true },
  question: { type: String },
  options: [
    {
      value: { type: Schema.Types.Mixed, required: true },
      text: { type: String, required: true },
    },
  ],
  axis: { type: String },
  chaine: { type: String },
});

questionSchema.pre<IQuestionSchema>('save', async function (next) {
  try {
    const diagnostique = await Diagnostique.findById(this.diagnostique);

    if (!diagnostique) {
      return next(new ApiError(404, 'Diagnostique not found ❌'));
    }

    if (diagnostique.diagnostique === DiagnostiqueName.RAISEC) {
      // Must have axis, and remove chaine if present
      if (!this.chaine) {
        return next(new ApiError(400, 'Field "axis" is required for RIASEC diagnostique ❌'));
      }
      this.axis = undefined; // optional: remove field if irrelevant
    } else {
      // Must have chaine, and remove axis if present
      if (typeof this.axis !== 'number') {
        return next(new ApiError(400, 'Field "chaine" is required for non-RIASEC diagnostique ❌'));
      }
      this.chaine = undefined; // optional: remove field if irrelevant
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Question = model<IQuestionSchema>('Question', questionSchema);

export { IQuestionSchema, Question };

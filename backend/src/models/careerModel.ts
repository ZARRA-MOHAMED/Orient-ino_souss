import mongoose, { Document, model, Schema } from 'mongoose';
import { ICareer } from '../types/careerTypes';
import { ERIASEC } from '../types/resultTypes';

interface ICareerSchema extends ICareer, Document {}

const schoolSchema = new Schema({
  school: { type: String, required: true },
  website: { type: String },
  cities: [{ type: String }]
});
const careerSchema = new Schema<ICareerSchema>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },

    riasecType: {
      type: String,
      enum: Object.values(ERIASEC),
      required: true,
    },

    exampleJobs: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    requiredEducation: [
      {
        type: String,
      }
    ],

    schools: [schoolSchema],

    jobMarket: {
      demand: {
        type: String,
        required: true,
      },
      averageSalary: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Career = model<ICareerSchema>('Career', careerSchema);

export { Career, ICareerSchema };

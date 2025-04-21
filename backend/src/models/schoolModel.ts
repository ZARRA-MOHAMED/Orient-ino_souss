import mongoose, { model, Schema, Document } from 'mongoose';
import { EDiplomaLevels, EEstablishmentType, ESchoolType, ISchool } from '../types/schoolTypes';

interface ISchoolSchema extends ISchool, Document {}

const schoolSchema = new Schema<ISchoolSchema>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
    },
    cities: [
      {
        type: String,
        required: true,
      },
    ],
    schoolType: {
      type: String,
      enum: Object.values(ESchoolType),
      required: true,
    },
    establishmentType: {
      type: String,
      enum: Object.values(EEstablishmentType),
      required: true,
    },
    fields: [
      {
        type: String,
      },
    ],
    diplomaLevels: [
      {
        type: String,
        enum: Object.values(EDiplomaLevels),
        required: true,
      },
    ],
    admission: {
      requiresExam: {
        type: Boolean,
      },
      minGrade: {
        type: String,
      },
      processDescription: {
        type: String,
      },
    },
    concours: [
      {
        name: {
          type: String,
        },
        branches: {},
      },
    ],
    isBoardingAvailable: {
      type: Boolean,
    },
    isScholarshipAvailable: {
      type: Boolean,
    },
    internationalPrograms: {
      type: Boolean,
    },
    requiredHighSchoolFiliere: [{
      type: String,
      required: true
    }],
    requiredHighSchoolBranche: [{
      type: String,
      required: true
    }]
  },
  
  { timestamps: true }
);

const School = model('School', schoolSchema);

export { School, ISchoolSchema };

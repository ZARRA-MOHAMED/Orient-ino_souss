import { ISchoolSchema } from '../models/schoolModel';
import { ERIASEC } from './resultTypes';

export enum EDemand {
  HIGH = 'high',
  medium = 'medium',
  LOW = 'low',
}

export interface ISchool {
  school: string;
  website?: string;
  cities: string[];
}

export interface ICareer {
  title: string;
  description?: string;
  riasecType: ERIASEC;

  exampleJobs: string[];
  tags: string[];

  // 🔹 1. Required Education
  requiredEducation: string[];

  // 🔹 2. Suggested Schools / Universities
  schools: ISchool[];

  jobMarket: {
    demand: String;
    averageSalary: String;
  };
<<<<<<< HEAD
=======

  // 🔹 3. Career Category
  category?: string;

  // 🔹 4. Required Skills
  skills?: string[];

  // 🔹 5. Career Pathway
  careerPath?: {
    level: string;
    title: string;
    description?: string;
    yearsOfExperience?: number;
  }[];
>>>>>>> 856d412f1afbcfc5a5f7f22887e97c2f6f1aac75
}

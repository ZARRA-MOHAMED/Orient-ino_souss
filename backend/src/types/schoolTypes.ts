import { IBranchSchema } from '../models/branchModel';
import { IFiliereSchema } from '../models/filiereModel';

export enum EEstablishmentType {
  UNIVERSITY = 'university',
  FACULTY = 'faculty',
  INSTITUTE = 'institute',
  SCHOOL = 'school',
  CPGE = 'cpge',
}

export enum EDiplomaLevels {
  BACHELOR = 'bachelor',
  MASTER = 'MASTER',
  PHD = 'phd',
  TS = 'ts',
  DEUG = 'deug',
}

export enum ESchoolType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

export interface ISchool {
  title: string;
  website?: string;
  cities?: string[];
  schoolType?: ESchoolType;
  establishmentType?: EEstablishmentType;
  fields?: string[];
  diplomaLevels?: EDiplomaLevels[];
  admission?: {
    requiresExam?: boolean;
    minGrade?: number;
    processDescription?: string;
  };
  concours?: {
    name: string;
    branches: string[]; // e.g., ['Science Math A', 'Physiques', 'SVT']
  }[];
  isBoardingAvailable?: boolean;
  isScholarshipAvailable?: boolean;
  internationalPrograms?: boolean;
  requiredHighSchoolFiliere: IFiliereSchema['_id'][];
  requiredHighSchoolBranche: IBranchSchema['_id'][];
}

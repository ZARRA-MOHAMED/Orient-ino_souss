import { IFiliereSchema } from '../models/filiereModel';
import { IBranch } from './branchTypes';

export enum ECycle {
  PRIMAIRE = 'primaire',
  COLLEGE = 'college',
  LYCEE = 'lycee',
}

export interface IGrade {
  title: string;
  cycle: ECycle;
  filiere?: IFiliereSchema['_id'];
  branch: IBranch['title'];
}

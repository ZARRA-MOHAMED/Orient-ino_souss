import { IFiliereSchema } from '../models/filiereModel';

export interface IBranch {
  filiere: IFiliereSchema['_id'];
  title: string;
}

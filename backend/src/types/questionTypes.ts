import { IDiagnostiqueSchema } from "../models/diagnostiqueModel";

export interface IQuestionOption {
  value: string | number | boolean;
  text: string;
}

export interface IQuestion {
  name: string;
  diagnostique: IDiagnostiqueSchema['_id'];
  question?: string;
  axis?: string;
  chaine?: string;
  options: IQuestionOption[];
}

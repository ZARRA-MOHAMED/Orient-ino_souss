import { IDiagnostiqueSchema } from "../models/diagnostiqueModel";

export enum ERIASEC {
  REALISTIC = 'realistic',
  ARTISTIC = 'artistic',
  INVESTIGATIVE = 'investigative',
  SOCIAL = 'social',
  ENTREPENEUR = 'entrepeneur',
  CONVENTIONAL = 'conventional',
}

export interface IRIASECScore {
  type: ERIASEC;
  score: number;
}

export interface IResult {
  diagnostique: IDiagnostiqueSchema['_id'];
  scores: IDiagnostiqueSchema['diagnostique'] extends 'RIASEC' ? IRIASECScore[] : number;
}

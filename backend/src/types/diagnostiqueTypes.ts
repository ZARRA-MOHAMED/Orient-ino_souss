export interface IDiagnostique {
  diagnostique: DiagnostiqueName;
  description: string;
  objectif: string;
}

export enum DiagnostiqueName {
  RAISEC = "RAISEC",
  OCEAN = "OCEAN",
  ANXIETE_SINCERE = "ANXIÉTÉ_SINCÈRE",
  ANXIETE_EXAMENS = "ANXIÉTÉ_AUX_EXAMENS",
  ANXIETE_FUTUR = "ANXIÉTÉ_FACE_AU_FUTUR",
  DEPRESSION = "DÉPRESSION",
  ESTIME_DE_SOI = "ESTIME_DE_SOI",
  DEPENDANCE_INTERNET = "DÉPENDANCE_À_INTERNET",
  PRESSION_PSYCHOLOGIQUE = "PRESSION_PSYCHOLOGIQUE"
}

export interface IData {
  answers: {
    axis: string;
    answers: number;
  }[];
}

export interface TraitResult {
  type: string;
  score: number;
  desc: string;
}





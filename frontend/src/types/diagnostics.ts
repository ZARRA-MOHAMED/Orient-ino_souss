
export interface Question {
  name: string;
  diagnostique: string;
  axis?: string;
  question?: string;
  options: {
    value: number;
    text: string;
  }[];
}

// export interface RaisecQuestion extends Question {
//   chain: string; // R, A, I, S, E, C
// }
export interface RaisecQuestion {
  name: string;
  diagnostique: string; // Now expects an ID string instead of "RAISEC"
  chaine: string;      // Changed from "chain" to "chaine" and uses string values
  question: string;
  options: {
    value: string;    // Changed from number to string (R, I, A, S, E, C)
    text: string;
  }[];
}
export interface TestResult {
  userId: string;
  diagnosticType: string;
  scores: Record<string, number>;
  description: string;
  timestamp: Date;
}

// export interface RaisecResult extends TestResult {
//   scores: {
//     R: number;
//     A: number;
//     I: number;
//     S: number;
//     E: number;
//     C: number;
//   };
// }

export interface RaisecAnswers {
  userID: string;
  diagID: string;
  answers: {
    question: string;
    answers: string[]; // Array of selected values (R, I, A, S, E, C)
  }[];
}

export interface Big5Result extends TestResult {
  scores: {
    Nevrosisme: number;
    Extraversion: number;
    Ouverture: number;
    Amabilite: number;
    Conscienciosite: number;
  };
}

export interface CareerSuggestion {
  _id: string;
  title: string;
  description: string;
  riasecType: string;
  exampleJobs: string[];
  tags: string[];
  requiredEducation: string[];
  schools: {
    school: string;
    website: string;
    cities: string[];
  }[];
  jobMarket: {
    demand: 'LOW' | 'MEDIUM' | 'HIGH';
    averageSalary: string;
  };
}

export interface EducationSuggestion {
  _id: string;
  title: string;
  website: string;
  cities: string[];
  schoolType: 'public' | 'private';
  establishmentType: 'university' | 'school' | 'institute';
  fields: string[];
  diplomaLevels: string[];
  requirements: {
    filiere: string;
    branch: string;
  }[];
  admission: {
    requiresExam: boolean;
    minGrade: number;
    processDescription: string;
  };
  concours: any[];
  isBoardingAvailable: boolean;
  isScholarshipAvailable: boolean;
  internationalPrograms: boolean;
}

export interface BlogArticle {
  _id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  school?: string;
  imageUrl?: string;
  author?: string;
  publishDate: Date;
  tags: string[];
}

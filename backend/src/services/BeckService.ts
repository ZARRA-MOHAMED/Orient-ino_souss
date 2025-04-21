import { IData } from "../types/diagnostiqueTypes";
import { TraitResult } from "../types/diagnostiqueTypes";

// interface TraitResult {
//     type: string;
//     score: number;
//     desc: string;
//   }
  
function calculateBeckDepressionResult(data: IData): TraitResult {  
  const axisScores = data.answers.reduce((acc, curr) => {
    acc += curr.answers;
    return acc;
  }, 0 as number);

  let desc = '';

  if (axisScores >= 0 && axisScores <= 1) desc = 'غائبة';
  else if (axisScores >= 2 && axisScores <= 8) desc = 'خفيفة';
  else if (axisScores >= 9 && axisScores <= 18) desc = 'متوسطة';
  else if (axisScores >= 19 && axisScores <= 33) desc = 'مرتفعة';
  else desc = 'حادة';

  return { type: 'درجة ادمان الانترنت', score: axisScores, desc };
}

export default calculateBeckDepressionResult;
  
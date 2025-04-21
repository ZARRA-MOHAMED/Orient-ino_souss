import { IData, TraitResult } from "../types/diagnostiqueTypes";


// answers: {
//   axis: string;
//   answers: number;
// }[];

function calculateSinceerAnxiatyResult(data: IData): TraitResult {  
  const axisScores = data.answers.reduce((acc, curr) => {
    acc += curr.answers;
    return acc;
  }, 0 as number);

  let desc = '';

  if (axisScores >= 0 && axisScores <= 10) desc = 'غائبة';
  else if (axisScores >= 11 && axisScores <= 20) desc = 'خفيفة';
  else if (axisScores >= 21 && axisScores <= 30) desc = 'متوسطة';
  else if (axisScores >= 31 && axisScores <= 40) desc = 'مرتفعة';
  else desc = 'حادة';

  return { type: 'درجةالقلق', score: axisScores, desc };
}

export default calculateSinceerAnxiatyResult;

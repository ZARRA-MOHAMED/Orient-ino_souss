import { IData, TraitResult } from '../types/diagnostiqueTypes';


function calculateInternetAddictionResult(data: IData): TraitResult {  
  const axisScores = data.answers.reduce((acc, curr) => {
    acc += curr.answers;
    return acc;
  }, 0 as number);

  let desc = '';

  if (axisScores >= 0 && axisScores <= 48) desc = 'غائبة';
  else if (axisScores >= 49 && axisScores <= 69) desc = 'خفيفة';
  else if (axisScores >= 70 && axisScores <= 90) desc = 'متوسطة';
  else if (axisScores >= 91 && axisScores <= 111) desc = 'مرتفعة';
  else desc = 'حادة';

  return { type: 'درجةادمان الانترنت', score: axisScores, desc };
}

export default calculateInternetAddictionResult;

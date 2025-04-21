import { IData } from '../types/diagnostiqueTypes';

function calculerScore(data: IData) {
  let result = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };
  console.log(data.answers.length);
  data.answers.forEach((question) => {
    let one = question.answers[0];
    let two = question.answers[1];
    let three = question.answers[2];
    result[one] += 3;
    result[two] += 2;
    result[three] += 1;
  });


  const keys = Object.keys(result); 
  console.log(result);

  const total = Object.values(result).reduce((sum, val) => {
      console.log(val)
     return sum + Number(val)

  }, 0);
  console.log('This Is The Total',total)

  const percentages = {};
  for (const key of keys) {
    percentages[key] = total === 0 ? 0 : Math.round((result[key] / total) * 100);
  }

  return percentages;

}

export default calculerScore;

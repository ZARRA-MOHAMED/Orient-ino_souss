import { IData } from "../types/diagnostiqueTypes";

interface TraitResult {
    type: string;
    score: number;
    desc: string;
}

function calculatePressionResult(data: IData): TraitResult {
    const axisScores = data.answers.reduce((acc, curr) => {
        acc += curr.answers;
        return acc;
    }, 0 as number);

    
        let desc = '';
        if (axisScores <= 27) desc = 'غائبة';
        else if (axisScores >= 28 && axisScores <= 39) desc = 'غائبة';
        else if (axisScores >= 40 && axisScores <= 50) desc = 'خفيفة';
        else if (axisScores >= 51 && axisScores <= 61) desc = 'متوسطة';
        else if (axisScores >= 61 && axisScores <= 72) desc = 'مرتفعة ';
        else if (axisScores >= 73 && axisScores <= 84) desc = 'حادة  ';
        else desc = 'غير معروفة';

        return {
            type: 'قياس الضغوط النفسيةالتيتواجهتالميذ الثانوي التأهيلي',
            score: axisScores,
            desc,
        };

}

export default calculatePressionResult;

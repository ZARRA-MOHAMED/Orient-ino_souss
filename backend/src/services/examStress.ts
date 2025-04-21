import { IData, TraitResult } from "../types/diagnostiqueTypes";

// interface IExamStress {
//     name: string,
//     diagnostiqueId: string,
//     value: number,
// }

export const calculateExamscore = (data: IData):TraitResult => {
    const score = data.answers.reduce((accu, i) => { return accu + i.answers }, 0)
    var result: {score: number, desc: string };
    switch (true) {
        case (score >= 0 && score <= 61):
            result = {score, desc: "Not Happen" };
            break;
        case (score >= 62 && score <= 107):
            result = { score, desc: "Happen Sometimes" };
            break;
        case (score >= 108 && score <= 130):
            result = { score, desc: "Happen Oftenly" };
            break;
        case (score >= 131 && score <= 190):
            result = {score, desc: "Happen Always" };
            break;
        default:
            result = {score: 0, desc: "Not Precised" };
    }
    return {...result, type:"درجة قلق الامتحان"};
}

import { IData, TraitResult } from "../types/diagnostiqueTypes";


export const calculateFutureStressResult = (data: IData):TraitResult => {
    const score = data.answers.reduce((accu, i) => { return accu + i.answers }, 0)
    var result: {score: number, desc: string };
    switch (true) {
        case (score >= 0 && score <= 87):
            result = {score, desc: "غائبة" };
            break;
        case (score >= 88 && score <= 126):
            result = { score, desc: "خفيف" };
            break;
        case (score >= 127 && score <= 165):
            result = { score, desc: "متوسط" };
            break;
        case (score >= 166 && score <= 204):
            result = {score, desc: "مرتفعة" };
            break;
        case (score >=205 && score <=240 ):
            result = {score, desc: "حادة" };
            break;
        default:
            result = {score: 0, desc: "Not Precised" };
    }
    return {...result,type:"درجة قلق المستقبل"};
}

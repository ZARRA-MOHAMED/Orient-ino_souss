import { IData, TraitResult } from "../types/diagnostiqueTypes";

function calculateOceanResult(data: IData): TraitResult[] {
    const axisScores = data.answers.reduce((acc, curr) => {
        const key = curr.axis ;
        acc[key] = (acc[key] || 0) + curr.answers;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(axisScores).map(([trait, score]) => {
        let desc = "";
        switch (trait) {
            case "العصابية":
                if (score >= 12 && score <= 18) desc = "قليلة جداً";
                else if (score >= 19 && score <= 25) desc = "قليلة";
                else if (score >= 26 && score <= 36) desc = "متوسطة";
                else if (score >= 37 && score <= 46) desc = "كبيرة";
                else if (score >= 47 && score <= 60) desc = "كبيرة جداً";
                else desc = "خارج النطاق"; // إضافة للتعامل مع القيم غير المتوقعة
                break;

            case "الانبساط":
                if (score >= 12 && score <= 27) desc = "قليلة جداً";
                else if (score >= 28 && score <= 35) desc = "قليلة";
                else if (score >= 36 && score <= 43) desc = "متوسطة";
                else if (score >= 44 && score <= 50) desc = "كبيرة";
                else if (score >= 51 && score <= 60) desc = "كبيرة جداً";
                else desc = "خارج النطاق";
                break;

            case "الانفتاح":
                if (score >= 12 && score <= 30) desc = "قليلة جداً";
                else if (score >= 31 && score <= 38) desc = "قليلة";
                else if (score >= 39 && score <= 43) desc = "متوسطة";
                else if (score >= 44 && score <= 50) desc = "كبيرة";
                else if (score >= 51 && score <= 60) desc = "كبيرة جداً";
                else desc = "خارج النطاق";
                break;

            case "الطيبة":
                if (score >= 12 && score <= 31) desc = "قليلة جداً";
                else if (score >= 32 && score <= 38) desc = "قليلة";
                else if (score >= 39 && score <= 45) desc = "متوسطة";
                else if (score >= 46 && score <= 51) desc = "كبيرة";
                else if (score >= 52 && score <= 60) desc = "كبيرة جداً";
                else desc = "خارج النطاق";
                break;

            case "الدقة والإتقان":
                if (score >= 12 && score <= 30) desc = "قليلة جداً";
                else if (score >= 31 && score <= 38) desc = "قليلة";
                else if (score >= 39 && score <= 47) desc = "متوسطة";
                else if (score >= 48 && score <= 54) desc = "كبيرة";
                else if (score >= 55 && score <= 60) desc = "كبيرة جداً";
                else desc = "خارج النطاق";
                break;

            default:
                desc = "سمة غير معروفة";
        }
        return { type: trait, score, desc };
    });
}


export default calculateOceanResult;
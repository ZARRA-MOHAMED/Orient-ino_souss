import { IData, TraitResult } from "../types/diagnostiqueTypes";


function calculateSelfEsteemResult(data: IData): TraitResult[] {
  const axisScores = data.answers.reduce(
    (acc, curr) => {
      const key = curr.axis;
      acc[key] = (acc[key] || 0) + curr.answers;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(axisScores).map(([trait, score]) => {
    let desc = '';
    switch (trait) {
      case 'تقدير الذات العائلي':
        if (score >= 10 && score <= 18) desc = 'غائبة';
        else if (score >= 19 && score <= 26) desc = 'خفيفة';
        else if (score >= 27 && score <= 34) desc = 'متوسطة';
        else if (score >= 35 && score <= 42) desc = 'مرتفعة';
        else if (score >= 43 && score <= 50) desc = 'مرتفعة جدا';
        else desc = 'خارج النطاق'; // إضافة للتعامل مع القيم غير المتوقعة
        break;

      case ' تقدير الذات المدرسي':
        if (score >= 10 && score <= 18) desc = 'غائبة';
        else if (score >= 19 && score <= 26) desc = 'خفيفة';
        else if (score >= 27 && score <= 34) desc = 'متوسطة';
        else if (score >= 35 && score <= 42) desc = 'مرتفعة';
        else if (score >= 43 && score <= 50) desc = 'مرتفعة جدا';
        else desc = 'خارج النطاق'; // إضافة للتعامل مع القيم غير المتوقعة
        break;

      case 'تقدير الذات الرفاق':
        if (score >= 10 && score <= 18) desc = 'غائبة';
        else if (score >= 19 && score <= 26) desc = 'خفيفة';
        else if (score >= 27 && score <= 34) desc = 'متوسطة';
        else if (score >= 35 && score <= 42) desc = 'مرتفعة';
        else if (score >= 43 && score <= 50) desc = 'مرتفعة جدا';
        else desc = 'خارج النطاق'; // إضافة للتعامل مع القيم غير المتوقعة
        break;

      default:
        desc = 'سمة غير معروفة';
    }
    return { type: trait, score, desc };
  });
}

export default calculateSelfEsteemResult;

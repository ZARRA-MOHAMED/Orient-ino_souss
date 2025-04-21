
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/MainLayout";

// Questions fictives pour le test d'anxiété
const anxietyQuestions = [
    {
        name: "Q1",
        diagnostique: "ANXIETE_FUTUR",
        question: "يراودني أمل في تحقيق أهدافي في الحياة.",
        options: [
            {value: 1,text: "تعبر عني تماما"},
            {value: 2,text: "تعبر عني كثيرا"},
            {value: 3,text: "تعبر عني بدرجة متوسطة"},
            {value: 4,text: "تعبر عني بدرجة قليلة"},
            {value: 5,text: "لا تعبر عني إطلاقا"}
        ]
    },
    {
        name: "Q2",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر أن فرص سعادتي ستتضاءل في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q3",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر أن حياتنا مقبلة على كوارث مختلفة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q4",
        diagnostique: "ANXIETE_FUTUR",
        question: "خوفي من المستقبل يضعف دوافعي لتأسيس عائلة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q5",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر أنني سيئ الحظ الآن وسيكون حظي أسوا في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q6",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى تکرار مشكلاتي الماضية في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q7",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر بالثقة بأي قرار أتخذه بشأن مستقبلي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q8",
        diagnostique: "ANXIETE_FUTUR",
        question: "ينتابني الإحساس بالأمل حين أفكر في مستقبلي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q9",
        diagnostique: "ANXIETE_FUTUR",
        question: "ينتابني الأرق ليلا كلما تأملت في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q10",
        diagnostique: "ANXIETE_FUTUR",
        question: "يتملكني الشعور بالإحباط، إذ أن المستقبل الذي ينتظرني غير واضح.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q11",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع أن حياتي في المستقبل ستصبح باعثة على التعاسة والشقاء.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q12",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع تزايد الشعور بالأمن والطمأنينة في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q13",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع زيادة عالية لأسعار المواد في الأيام المقبلة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q14",
        diagnostique: "ANXIETE_FUTUR",
        question: "يراودني أمل في الحصول على فرصة لإكمال دراستي العالية مستقبلا.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q15",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن التخطيط لعمل ما مضيعة للوقت.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q16",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن متابعة دراستي نوع من العبث وغير مجدية لمستقبل عائلتي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q17",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع أن أجد صعوبات ترهقني مستقبلا للحصول على دخل يسد حاجاتي المعاشية.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q18",
        diagnostique: "ANXIETE_FUTUR",
        question: "بفضل دراستي، سأكون عضوا نافعا في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q19",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر أن الدراسة مصدر ضمان اقتصادي للغد.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q20",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن القيم الأخلاقية ترتقي يوما بعد آخر.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q21",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن الهجرة إلى الخارج ستكون الحل الأخير لما أعانيه من مشكلات.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q22",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى ألا أوفق في حياتي الزوجية مستقبلا.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q23",
        diagnostique: "ANXIETE_FUTUR",
        question: "عندي أمل أن أتكيف مع الجو الجامعي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q24",
        diagnostique: "ANXIETE_FUTUR",
        question: "إن استمراري في الدراسة يرفع من فرص حصولي على زواج مناسب.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q25",
        diagnostique: "ANXIETE_FUTUR",
        question: "اثق بقدرتي على حل أية مشكلة اجتماعية تواجهني.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q26",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أنني سأواكب مستجدات الحياة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q27",
        diagnostique: "ANXIETE_FUTUR",
        question: "لدي أصدقاء وصديقات أعتمد عليهم وقت الحاجة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q28",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى أن تجبرني ظروفي على التعامل مع أفراد لا أنسجم معهم.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q29",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى أن تكون علاقات الآخرين معي نفعية.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q30",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى على بلدي من أي مكروه.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q31",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن العلاقات الاجتماعية غير صادقة كلما تقدم بي العمر.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q32",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى استمرار تدهور العلاقات الاجتماعية والإنسانية بين الأفراد في المستقبل.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q33",
        diagnostique: "ANXIETE_FUTUR",
        question: "خوفي على نفسي من غدر الذين من حولي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q34",
        diagnostique: "ANXIETE_FUTUR",
        question: "عند مراجعتي الطبيب يؤكد أن ما أعانيه من الأم راجع إلى أسباب نفسية.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q35",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى من انتشار الأوبئة والأمراض بشكل أوسع مستقبلا.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q36",
        diagnostique: "ANXIETE_FUTUR",
        question: "أعاني من جفاف الفم عندما أفكر بمستقبلي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q37",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى من الإصابة بعاهات بدنية.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q38",
        diagnostique: "ANXIETE_FUTUR",
        question: "ألاحظ أن يدي ترتعش عندما أقوم بعمل ما.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q39",
        diagnostique: "ANXIETE_FUTUR",
        question: "أعرق كثيرا وبسهولة حتى أيام البرد.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q40",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر بضغط في صدري وأن قلبي يدق بشدة عليه عند تفكيري في مستقبلي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q41",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع استمرار الظروف الضاغطة الحالية مما يؤدي إلى تدهور صحتي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q42",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر بآلام في المعدة كلما تأملت مستقبلي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q43",
        diagnostique: "ANXIETE_FUTUR",
        question: "يقلقني تدخل الأهل في تقرير مصيري.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q44",
        diagnostique: "ANXIETE_FUTUR",
        question: "أخشى أن أفقد أحد أفراد أسرتي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q45",
        diagnostique: "ANXIETE_FUTUR",
        question: "أرى أن دوري في الأسرة سيزداد قوة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q46",
        diagnostique: "ANXIETE_FUTUR",
        question: "أتوقع أن تحصل لي خلافات أسرية مستقبلا.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q47",
        diagnostique: "ANXIETE_FUTUR",
        question: "يتملكني شعور بالاطمئنان على مستقبل أسرتي.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    },
    {
        name: "Q48",
        diagnostique: "ANXIETE_FUTUR",
        question: "أشعر بالاطمئنان على أفراد أسرتي على الرغم من انتشار الظواهر السلوكية غير السليمة.",
        options: [
            {
                value: 1,
                text: "تعبر عني تماما"
            },
            {
                value: 2,
                text: "تعبر عني كثيرا"
            },
            {
                value: 3,
                text: "تعبر عني بدرجة متوسطة"
            },
            {
                value: 4,
                text: "تعبر عني بدرجة قليلة"
            },
            {
                value: 5,
                text: "لا تعبر عني إطلاقا"
            }
        ]
    }
];

const AnxietyFutur: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const currentQuestion = anxietyQuestions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.name]: value
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < anxietyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    // Dans une implémentation réelle, envoyez les réponses au backend ici
    console.log("Réponses soumises :", answers);
    
    // Redirection vers la page des résultats
    navigate("/diagnostics/anxiety/results");
  };
  
  const isLastQuestion = currentQuestionIndex === anxietyQuestions.length - 1;
  const isAnswered = answers[currentQuestion.name] !== undefined;
  const progressPercentage = ((currentQuestionIndex + 1) / anxietyQuestions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Test d'Anxiété face aux future</h1>
          
          <div className="mb-6 bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-orientpro-blue h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Question {currentQuestionIndex + 1}/{anxietyQuestions.length}</CardTitle>
              <CardDescription>
                Veuillez répondre honnêtement à chaque question en fonction de votre expérience au cours des deux dernières semaines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                <RadioGroup 
                  value={answers[currentQuestion.name]} 
                  onValueChange={handleAnswerChange}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.value.toString()} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                        <RadioGroupItem value={option.value.toString()} id={`${currentQuestion.name}-${option.value.toString()}`} />
                        <Label htmlFor={`${currentQuestion.name}-${option.value.toString()}`} className="flex-grow cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={handlePrevious} 
                variant="outline" 
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              
              {isLastQuestion ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isAnswered}
                  className="bg-orientpro-blue hover:bg-orientpro-blue/90"
                >
                  Terminer <Check className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  disabled={!isAnswered}
                >
                  Suivant <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>Vous pouvez abandonner le test à tout moment, mais vos réponses ne seront pas enregistrées.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnxietyFutur;

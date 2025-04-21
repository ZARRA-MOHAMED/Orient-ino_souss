import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/MainLayout";
//import fetchOceanQuestionsFromAPI from "@/api/oceanQuestions"; // Assuming you have an API function to fetch questions

interface OceanQuestion {
  name: string;
  diagnostique: string;
  axis: string; // العصابية, الانبساطية, الانفتاح, القبول, الوعي
  question: string;
  options: {
    value: number; // Changed from string to number
    text: string;
  }[];
}

interface TraitResult {
  type: string;
  score: number;
  desc: string;
}

// Updated questions to match your prototype
//const oceanQuestions: OceanQuestion[] = fetchOceanQuestionsFromAPI(); // Assuming you have a function to fetch questions from an API
const oceanQuestions: OceanQuestion[] = [
  {
    name: "Q1",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أنا لست قلقا (متوترا)",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q2",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أحب أن يكون حولي عدد كبير من الناس.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q3",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "لا أحب أن أضيع وقتي في أحلام المستقبل وفي التخيلات.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q4",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أحاول أن أكون لطيفا مع كل فرد ألتقي به.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q5",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أحتفظ بممتلكاتي نظيفة ومرتبة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q6",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر أنني أقل مستوى من الآخرين.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q7",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أضحك بسهولة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q8",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "عندما أجد الطريقة الصحيحة لعمل شيء استمر عليها.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q9",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أدخل كثيرا في جدال مع أفراد عائلتي وزملائي.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q10",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أتمكن من إنجاز الأشیاء في وقتها المحدد.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q11",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "عندما تكون على ضغوط كثي أشعر بأنني سوف أنهار.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q12",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "لا أعتقد أن الآخرين یسرون بوجودي.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q13",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "تعجبني الأعمال الفنية أو الأشكال الفنية الموجودة في الطبيعة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q14",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "یقول عني بعض الناس بأنني أناني ومغرور.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q15",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "لا أحافظ على النظام.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q16",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر بالوحدة والكآبة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q17",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أستمتع حقا بالتحدث مع الناس.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q18",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "أعتقد أن استمتاع الطلبة والتلاميذ إلى جدالات أو مناقشات (سیاسية أو فكرية أو دينية) بمكن أن بشوش تفكيرهم ویضللهم.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q19",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أفضل التعاون مع الآخرين على التنافس معهم.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q20",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أحاول إنجاز الأعمال المطلوبة مني بضمير.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q21",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر بالتوتر والعصبية.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q22",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أحب أن أكون في مكان حیث توجد الحركة والنشاط.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q23",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "لا أهتم بفنون وثقافات الآخرين",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q24",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أمی́ل إلى الشك والسخرية من نوابا الآخرين.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q25",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "لدي مجموعة أهداف واضحة أسعى إلى تحقیقها بطريقة منظمة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q26",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر بأنه لا قیمة لي.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q27",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أفضل العمل (الدراسة) بمفردي.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q28",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "أجرب الأكلات الجديدة والأجنبية.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q29",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أعتقد بأن معظم الناس ستستغلني إذا سمحت لهم بذلك.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q30",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أضیع الكثير من الوقت قبل أن أبدأ أي عمل.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q31",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر بالخوف والقلق.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q32",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أشعر كأنني أفیض قوة ونشاطا.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q33",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "تتغير مشاعري و أرتاح نفسیا أمام منظر جمیل .",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q34",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "یحبني معظم الناس الذین أعرفهم.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q35",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أعمل باجتهاد في سبیل تحقيق أهدافي.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q36",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "تغضبني الطريقة التي یعاملني بها الناس.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q37",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أنا شخص ممتلئ بالحيوية والنشاط",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q38",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "أعتقد بأنه یجب علینا الرجوع إلى الأعراف والتقاليد للحسم في المشكلات الأخلاقية.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q39",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "یعتقد البعض بأنني غير متعاطف مع الآخرين.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q40",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "عندما أتعهد بشيء أستطیع دائما الالتزام به ومتابعته للنهایة.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q41",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "عندما تسوء الأمور أشعر بالفشل والاستسلام.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q42",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "لست متفائلا مبتهجا(فرحا).",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q43",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "أحس بالإعجاب الشدید تجاه الا عمال الفنیة أو الشعر.",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q44",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أتمسك بمواقفي وآرائي ولا أتنازل أبدا عنها.",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q45",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "لست شخصا یمكن ان یثق فیه الآخرون ویعتمدوا عليه",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q46",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر بالحزن والاكتئاب",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q47",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أشعر أن حیاتي تجري بسرعة",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q48",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "لدي اهتمام بالتأمل في طبیعة الكون أو الظروف الإنسانیة",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q49",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "أحاول أن أراعي مشاعر الآخرین و لا أجرحها",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q50",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أنهي (أكمل) دائما عملي دون تأجیل أو إهمال",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q51",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أشعر غالبا بالعجز وبحاجة لشخص یحل مشاكلي",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q52",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "أنا شخص نشیط جدا",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q53",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "لدي الكثير من حب الاستطلاع الفكري",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q54",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "إن لم أكن أحب بعض الناس أ عبر لهم عن ذلك",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q55",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "لا أستطیع أن أكون منظما",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q56",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "العصابية",
    question: "أحیانا أشعر بالخجل الشدید",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q57",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانبساط",
    question: "لا أحب أن أكون قائدا للآخرین (رئیسا لمجموعة)",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q58",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الانفتاح",
    question: "أستمتع بالتفكير والاطلاع على النظریات والأفكار المجردة (غيرالملموسة)",
    options: [
      {
        value: 1,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 5,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q59",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الطيبة",
    question: "یمكنني عند الضرورة التحایل على الناس للحصول على ما أرید",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  },
  {
    name: "Q60",
    diagnostique: "67f90765a5c108eed164f455",
    axis: "الدقة و الاتقان",
    question: "أكافح من أجل التفوق في كل ش يء أقوم به",
    options: [
      {
        value: 5,
        text: "تنطبق علي بدرجة قليلة جدا"
      },
      {
        value: 4,
        text: "تنطبق علي بدرجة قليلة"
      },
      {
        value: 3,
        text: "تنطبق علي بدرجة متوسطة"
      },
      {
        value: 2,
        text: "تنطبق علي بدرجة كبيرة"
      },
      {
        value: 1,
        text: "تنطبق علي بدرجة كبيرة جدا"
      }
    ]
  }
]
;

const OceanTest: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({}); // Changed to number values
  const navigate = useNavigate();
  
  const currentQuestion = oceanQuestions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.name]: parseInt(value) // Convert to number
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < oceanQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateResults = (): TraitResult[] => {
    // Group answers by axis and calculate scores
    const axisScores: Record<string, number> = {};
    const axisCounts: Record<string, number> = {};
    
    oceanQuestions.forEach(question => {
      const answer = answers[question.name];
      if (answer !== undefined) {
        axisScores[question.axis] = (axisScores[question.axis] || 0) + answer;
        axisCounts[question.axis] = (axisCounts[question.axis] || 0) + 1;
      }
    });
    
    // Calculate average scores and generate descriptions
    return Object.keys(axisScores).map(axis => {
      const score = axisScores[axis];
      const count = axisCounts[axis];
      const averageScore = score / count;
      
      // Generate description based on score
      let desc = "";
      if (averageScore >= 4) {
        desc = "درجة عالية جدا";
      } else if (averageScore >= 3) {
        desc = "درجة عالية";
      } else if (averageScore >= 2) {
        desc = "درجة متوسطة";
      } else {
        desc = "درجة منخفضة";
      }
      
      return {
        type: axis,
        score: averageScore,
        desc: desc
      };
    });
  };
  
  const handleSubmit = () => {
    // Calculate results
    const results = calculateResults();
    
    // In a real implementation, you would send results to backend here
    console.log("Results:", results);
    
    // For demo, we'll navigate to results page with the data
    navigate("/diagnostics/ocean/results", { state: { results } });
  };
  
  const isLastQuestion = currentQuestionIndex === oceanQuestions.length - 1;
  const isAnswered = answers[currentQuestion.name] !== undefined;
  const progressPercentage = ((currentQuestionIndex + 1) / oceanQuestions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">اختبار الشخصية OCEAN</h1>
          
          <div className="mb-6 bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-orientpro-indigo h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>السؤال {currentQuestionIndex + 1}/{oceanQuestions.length}</CardTitle>
              <CardDescription>
                يرجى الإشارة إلى مدى اتفاقك مع كل عبارة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-right">{currentQuestion.question}</h3>
                <RadioGroup 
                  value={answers[currentQuestion.name]?.toString()} 
                  onValueChange={handleAnswerChange}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 text-right">
                        <RadioGroupItem value={option.value.toString()} id={`${currentQuestion.name}-${option.value}`} />
                        <Label htmlFor={`${currentQuestion.name}-${option.value}`} className="flex-grow cursor-pointer">
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
                <ArrowLeft className="mr-2 h-4 w-4" /> السابق
              </Button>
              
              {isLastQuestion ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isAnswered}
                  className="bg-orientpro-indigo hover:bg-orientpro-indigo/90"
                >
                  إنهاء <Check className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  disabled={!isAnswered}
                >
                  التالي <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>هذا الاختبار يقيس خمسة أبعاد رئيسية للشخصية</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OceanTest;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowRight, Check } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import MainLayout from "@/layouts/MainLayout";

// // Questions fictives pour le test OCEAN (Big Five)
// const oceanQuestions = [
//   {
//     id: "o1",
//     question: "Je me vois comme quelqu'un qui est créatif et a beaucoup d'idées originales.",
//     axis: "openness",
//     options: [
//       { value: "1", label: "Tout à fait en désaccord" },
//       { value: "2", label: "Plutôt en désaccord" },
//       { value: "3", label: "Ni en accord ni en désaccord" },
//       { value: "4", label: "Plutôt d'accord" },
//       { value: "5", label: "Tout à fait d'accord" }
//     ]
//   },
//   {
//     id: "c1",
//     question: "Je me vois comme quelqu'un qui fait du travail minutieux.",
//     axis: "conscientiousness",
//     options: [
//       { value: "1", label: "Tout à fait en désaccord" },
//       { value: "2", label: "Plutôt en désaccord" },
//       { value: "3", label: "Ni en accord ni en désaccord" },
//       { value: "4", label: "Plutôt d'accord" },
//       { value: "5", label: "Tout à fait d'accord" }
//     ]
//   },
//   {
//     id: "e1",
//     question: "Je me vois comme quelqu'un qui est communicatif et sociable.",
//     axis: "extraversion",
//     options: [
//       { value: "1", label: "Tout à fait en désaccord" },
//       { value: "2", label: "Plutôt en désaccord" },
//       { value: "3", label: "Ni en accord ni en désaccord" },
//       { value: "4", label: "Plutôt d'accord" },
//       { value: "5", label: "Tout à fait d'accord" }
//     ]
//   },
//   {
//     id: "a1",
//     question: "Je me vois comme quelqu'un qui fait confiance aux autres et croit en la bonté humaine.",
//     axis: "agreeableness",
//     options: [
//       { value: "1", label: "Tout à fait en désaccord" },
//       { value: "2", label: "Plutôt en désaccord" },
//       { value: "3", label: "Ni en accord ni en désaccord" },
//       { value: "4", label: "Plutôt d'accord" },
//       { value: "5", label: "Tout à fait d'accord" }
//     ]
//   },
//   {
//     id: "n1",
//     question: "Je me vois comme quelqu'un qui est facilement anxieux et facilement perturbé.",
//     axis: "neuroticism",
//     options: [
//       { value: "1", label: "Tout à fait en désaccord" },
//       { value: "2", label: "Plutôt en désaccord" },
//       { value: "3", label: "Ni en accord ni en désaccord" },
//       { value: "4", label: "Plutôt d'accord" },
//       { value: "5", label: "Tout à fait d'accord" }
//     ]
//   }
// ];

// const OceanTest: React.FC = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const navigate = useNavigate();
  
//   const currentQuestion = oceanQuestions[currentQuestionIndex];
  
//   const handleAnswerChange = (value: string) => {
//     setAnswers({
//       ...answers,
//       [currentQuestion.id]: value
//     });
//   };
  
//   const handleNext = () => {
//     if (currentQuestionIndex < oceanQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };
  
//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };
  
//   const handleSubmit = () => {
//     // Dans une implémentation réelle, envoyez les réponses au backend ici
//     console.log("Réponses soumises :", answers);
    
//     // Redirection vers la page des résultats
//     navigate("/diagnostics/ocean/results");
//   };
  
//   const isLastQuestion = currentQuestionIndex === oceanQuestions.length - 1;
//   const isAnswered = answers[currentQuestion.id] !== undefined;
//   const progressPercentage = ((currentQuestionIndex + 1) / oceanQuestions.length) * 100;
  
//   return (
//     <MainLayout>
//       <div className="container py-10">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-2xl font-bold mb-6">Test de personnalité Big Five (OCEAN)</h1>
          
//           <div className="mb-6 bg-gray-200 h-2 rounded-full">
//             <div 
//               className="bg-orientpro-indigo h-2 rounded-full transition-all duration-300" 
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
          
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle>Question {currentQuestionIndex + 1}/{oceanQuestions.length}</CardTitle>
//               <CardDescription>
//                 Indiquez à quel point vous êtes d'accord avec chaque affirmation.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
//                 <RadioGroup 
//                   value={answers[currentQuestion.id]} 
//                   onValueChange={handleAnswerChange}
//                 >
//                   <div className="space-y-3">
//                     {currentQuestion.options.map((option) => (
//                       <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
//                         <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
//                         <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="flex-grow cursor-pointer">
//                           {option.label}
//                         </Label>
//                       </div>
//                     ))}
//                   </div>
//                 </RadioGroup>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button 
//                 onClick={handlePrevious} 
//                 variant="outline" 
//                 disabled={currentQuestionIndex === 0}
//               >
//                 <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
//               </Button>
              
//               {isLastQuestion ? (
//                 <Button 
//                   onClick={handleSubmit} 
//                   disabled={!isAnswered}
//                   className="bg-orientpro-indigo hover:bg-orientpro-indigo/90"
//                 >
//                   Terminer <Check className="ml-2 h-4 w-4" />
//                 </Button>
//               ) : (
//                 <Button 
//                   onClick={handleNext} 
//                   disabled={!isAnswered}
//                 >
//                   Suivant <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
          
//           <div className="text-center text-sm text-gray-500">
//             <p>Ce test comprend normalement 40-60 questions. Cette version est abrégée pour démonstration.</p>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default OceanTest;

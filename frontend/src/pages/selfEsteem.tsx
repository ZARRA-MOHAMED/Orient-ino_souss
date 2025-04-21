
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
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: " . أسرتي فخورة بي",
    options: [
      { value: 5, text: "تنطبق تماما" },
      { value: 4, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 2, text: "تنطبق نادرا" },
      { value: 1, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q2",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "أجد إهمال من الأسرة في المنزل.",
    options: [
      { value: 5, text: "تنطبق تماما" },
      { value: 4, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 2, text: "تنطبق نادرا" },
      { value: 1, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q3",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "لدى أسرتي إحساس بأنه يمكن الاعتماد عليها.",
    options: [
      { value: 1, text: "تنطبق تماما" },
      { value: 2, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 4, text: "تنطبق نادرا" },
      { value: 5, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q4",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "والدي يتخليان عني.",
    options: [
      { value: 5, text: "تنطبق تماما" },
      { value: 4, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 2, text: "تنطبق نادرا" },
      { value: 1, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q5",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "تحاول أسرتي فهم وجهة نظري في الأعمال التي أقوم بها.",
    options: [
      { value: 1, text: "تنطبق تماما" },
      { value: 2, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 4, text: "تنطبق نادرا" },
      { value: 5, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q6",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "تتوقع مني أسرتي الكثير.",
    options: [
      { value: 1, text: "تنطبق تماما" },
      { value: 2, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 4, text: "تنطبق نادرا" },
      { value: 5, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q7",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "أنا شخص مهم داخل أسرتي.",
    options: [
      { value: 1, text: "تنطبق تماما" },
      { value: 2, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 4, text: "تنطبق نادرا" },
      { value: 5, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q8",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "أحس بأنني شخص غير مرغوب فيه في المنزل.",
    options: [
      { value: 5, text: "تنطبق تماما" },
      { value: 4, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 2, text: "تنطبق نادرا" },
      { value: 1, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q9",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "أسرتي تعتقد بأنني سأكون شخصًا ناجحًا في المستقبل.",
    options: [
      { value: 1, text: "تنطبق تماما" },
      { value: 2, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 4, text: "تنطبق نادرا" },
      { value: 5, text: "لا تنطبق" }
    ]
  },
  {
    name: "Q10",
    diagnostique: "ESTIME_SOI",
    axis: "تقدير الذات العائلي",
    question: "تمنيت لو كنت ولدت في أسرة غير أسرتي.",
    options: [
      { value: 5, text: "تنطبق تماما" },
      { value: 4, text: "تنطبق غالبا" },
      { value: 3, text: "تنطبق بدرجة متوسطة" },
      { value: 2, text: "تنطبق نادرا" },
      { value: 1, text: "لا تنطبق" }
    ]
  },
  // {
  //   name: "Q11",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات املدرسي",
  //   question: "الأساتذة يتوقعون مني الكثير في الدراسة.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q12",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "أنا جيد في إنجاز الأشياء مثل الآخرين.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q13",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "أشعر بأنني عديم الفائدة في المدرسة.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q14",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "أنا فخور بنتائجي مقارنة بزملائي.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q15",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "تشكل المدرسة صعوبة للمقارنة مع زملائي.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q16",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "الأساتذة يسعدون عند قيامي بواجبي.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q17",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "معظم الأساتذة لا يفهمونني.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q18",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "أنا شخص مهم في القسم.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q19",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "مهما بذلت من جهد فإنني لا أحصل على النتائج التي أستحقها.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q20",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات المدرسي",
  //   question: "أشعر بأنني محروم من حظوظ الأساتذة الذين درسوني منذ التحاقي بالمدرسة إلى الآن.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q21",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "لدي أصدقاء كثيرون في سني.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q22",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "لست محبوبا مثل أقراني.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q23",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "ليست لدي علاقات كثيرة مثل أقراني.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q24",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "الأشخاص الذين هم في مثل سني غالبا ما يضايقونني.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q25",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "بعض الأصدقاء يعتقدون أنني أمرح كثيرًا أو أنني من الممتع أن أكون معهم.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q26",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "عادةً ما أتجنب زملائي لأنني لا أريد أن أكون مثلهم.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q27",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "يتمنى أشخاص آخرون لو كانوا مثلي.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q28",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "أتمنى لو كنت شخصاً مختلفاً حتى يكون عندي أصدقاء كثيرون.",
  //   options: [
  //     { value: 5, text: "تنطبق تماما" },
  //     { value: 4, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 2, text: "تنطبق نادرا" },
  //     { value: 1, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q29",
  //   diagnostique: "ESTIME_SOI",
  //   axis: "تقدير الذات الرفاقي",
  //   question: "لو أن أصدقائي قرروا التصويت لإقادة المجموعة فسوف ينتخبونني ضمن المراكز القيادية العليا.",
  //   options: [
  //     { value: 1, text: "تنطبق تماما" },
  //     { value: 2, text: "تنطبق غالبا" },
  //     { value: 3, text: "تنطبق بدرجة متوسطة" },
  //     { value: 4, text: "تنطبق نادرا" },
  //     { value: 5, text: "لا تنطبق" }
  //   ]
  // },
  // {
  //   name: "Q30",
  //   diagnostique: "ESTIME_SOI",
  //   "axis": "تقدير الذات الرفاقي",
  //   "question": "عندما يكون هناك مشكلة، فلست الشخص الذي يلجأ إليه الزملاء للمساعدة.",
  //   "options": [
  //     { "value": 5, text: "تنطبق تماما" },
  //     { "value": 4, text: "تنطبق غالبا" },
  //     { "value": 3, text: "تنطبق بدرجة متوسطة" },
  //     { "value": 2, text: "تنطبق نادرا" },
  //     { "value": 1, text: "لا تنطبق" }
  //   ]
  // }
];

const SelfEsteem: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const currentQuestion = anxietyQuestions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.axis]: value
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
  const isAnswered = answers[currentQuestion.axis] !== undefined;
  const progressPercentage = ((currentQuestionIndex + 1) / anxietyQuestions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Test de self estimation</h1>
          
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

export default SelfEsteem;

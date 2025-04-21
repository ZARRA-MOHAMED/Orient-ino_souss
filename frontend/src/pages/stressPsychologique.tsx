
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
        "name": "Q1",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يضايقني أن يفرق الأستاذ بيني وبين زملائي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q2",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "اشعر بالضيق عند مدح الاستاذ للتلاميذ الآخرين",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q3",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أشعر بالضيق عند قلة اهتمام الاستاذ بي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q4",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "اخاف ان يعاقبني الاستاذ اثناء الدرس",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q5",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أحب توجيه الأسئلة للأستاذ",
        "options": [
          { "value": 3, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 1, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q6",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أعاني من صعوبة فهم بعض ما يشرحه الاستاذ لي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q7",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أرتبك عندما يطلب مني الاستاذ المشاركة في الدرس فجأة",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q8",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يضايقني ارسالي الى المدير عندما أقوم بمخالفة",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q9",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أخاف من مدير الثانوية",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q10",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يضايقني أن يفرق المدير بيني وبين زملائي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q11",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "تزعجني كثرة الواجبات المنزلية",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q12",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أشعر بالضيق عندما أقصر في تحضير دروسي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q13",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "تزعجني كثرة الامتحانات",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q14",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أخاف من عدم الحصول على معدلات عالية",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q15",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يفرحني منافسة الآخرين لي في الحصول على معدلات عالية",
        "options": [
          { "value": 3, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 1, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q16",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أتضايق من تعليقات زملائي على مستواي الدراسي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q17",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "اشعر بالخجل عندما أخطأ امام التلاميذ في القسم",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q18",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أشعر بالملل أثناء الدرس",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q19",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أشعر بالضيق من طول اليوم الدراسي",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q20",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يضايقني وجود تلاميذ كثيري الحركة داخل القسم",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q21",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "تضايقني الضوضاء خارج جدران الثانوية",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q22",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يضايقني رفض التلاميذ مشاركتهم اللعب خلال حصة الرياضة",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q23",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أخاف من تهديد التلاميذ المشاغبين في الثانوية",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q24",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "أشعر بالراحة من قلة ممارسة الأنشطة الرياضية",
        "options": [
          { "value": 3, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 1, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q25",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "تضايقني قلة الوسائل التعليمية (السمعية، البصرية)",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q26",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "تزعجني عدم توفر وسائل التكييف المناسبة داخل القسم",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q27",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "يزعجني عدم وجود منهج دراسي خاص بالتلاميذ المتميزين",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      },
      {
        "name": "Q28",
        "diagnostique": "PRESSION_PSYCHOLOGIQUE",
        "question": "اشعر بالضيق من قلة الانشطة الموازية (العروض الفنية، الرحلات)",
        "options": [
          { "value": 1, "text": "لا أعاني من مشكلة" },
          { "value": 2, "text": "أعاني بدرجة بسيطة" },
          { "value": 3, "text": "أعاني بدرجة شديدة" }
        ]
      }
];

const StressPsychologique: React.FC = () => {
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
          <h1 className="text-2xl font-bold mb-6">Test de stress psychologique</h1>
          
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

export default StressPsychologique;


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
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالضيق عندما يسألني الأستاذ من أجل اختبار مدى استفادتي من الدرس.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q2",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق حول إذا ما كنت سأنجح في نهاية السنة أم لا.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q3",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالتوتر حين يطلب مني الأستاذ الوقوف والقراءة بصوت مرتفع.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q4",
        diagnostique: "ANXIETE_EXAMENS",
        question: "عندما يطلب مني الأستاذ انجاز تمرين على السبورة أتمنى لو طلب ذلك من تلميذ آخر.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q5",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أثناء نومي أحلم كثيرا بالإمتحانات.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q6",
        diagnostique: "ANXIETE_EXAMENS",
        question: "تزداد دقات قلبي عندما يقترب موعد الإمتحانات.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q7",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق الشديد أثناء تفكيري في الإمتحانات المقبلة خاصة أثناء الاستعداد للنوم.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q8",
        diagnostique: "ANXIETE_EXAMENS",
        question: "ترتجف (ترتعد) يدي عندما يطلب الأستاذ مني الكتابة على السبورة أمام زملائي.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q9",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالتوتر عند اقتراب موعد الإمتحان أكثر من زملائي.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q10",
        diagnostique: "ANXIETE_EXAMENS",
        question: "في البيت، عندما أفكر في دروس الغد أخاف أن أعطي إجابات خاطئة.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q11",
        diagnostique: "ANXIETE_EXAMENS",
        question: "إذا تغيبت عن المدرسة بسبب مرض أشعر أن أدائي سوف يكون أقل من زملائي.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q12",
        diagnostique: "ANXIETE_EXAMENS",
        question: "عندما أفكر بدروس اليوم التالي أشعر بالقلق بأن أدائي (إنجازي) في بعض الدروس لن يكون جيدا.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q13",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالغثيان والارتجاف (الارتعاد) أو الدوار (الدوخة) عندما يسألني الأستاذ للتأكد من مدى استفادتي من الدرس.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q14",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالارتباك والتوتر عندما تكون إجابتي خاطئة.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q15",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بخوف من كل موقف فيه امتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q16",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بضيق شديد قبل دخولي الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q17",
        diagnostique: "ANXIETE_EXAMENS",
        question: "بعد الانتهاء من الإمتحان أشعر بالتوتر حيال أدائي حول مدى صحة إجاباتي.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q18",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر أحيانا أن أدائي في الإمتحان كان سيئا بالرغم من تحضيري واستعدادي له.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q19",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر أن يدي ترتجف (ترتعد) أثناء الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q20",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أخاف من الفشل إذا علمت أن الأستاذ سيعطينا امتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q21",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر أنني أنسى في الإمتحان كثيرا من المعلومات التي كنت أتذكرها قبل بدئه.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q22",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أتمنى لو أنني لا أشعر بضيق من الإمتحان بهذه الدرجة.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q23",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق كلما أخبرنا الأستاذ بموعد الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q24",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر أن إجاباتي سوف تكون سيئة أثناء الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q25",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أخاف أحيانا عندما أكون ذاهبا إلى المدرسة أن يفاجئنا الأستاذ بتمرير امتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q26",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بصداع (ألم في الرأس) شديد قبل وأثناء الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q27",
        diagnostique: "ANXIETE_EXAMENS",
        question: "خوفي من الرسوب (عدم النجاح) يعيق أدائي وتقدمي في الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q28",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق عندما يعلن الأستاذ الوقت المتبقي لإنهاء الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q29",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالخوف أثناء انتظار توزيع أوراق أسئلة الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q30",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق أثناء الإمتحان خوفا من ألا يكفيني الوقت للإجابة عن أسئلته.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q31",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق أثناء انتظار دخول قاعة الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q32",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالخوف من المدرسة لأنها تذكرني بالإمتحانات.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q33",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بعدم الارتياح أثناء تحدث التلاميذ في الساحة عن امتحان قادم.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q34",
        diagnostique: "ANXIETE_EXAMENS",
        question: "تتعرق يدي ووجهي أثناء الإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q35",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالتوتر والارتباك أثناء استعدادي للإمتحان.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q36",
        diagnostique: "ANXIETE_EXAMENS",
        question: "غالبا ما أشعر بالقلق أثناء استعدادي للإمتحان قبل موعده بيوم.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q37",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر دائما بالتوتر والارتباك عند استعداد للإمتحان النهائي.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      },
      {
        name: "Q38",
        diagnostique: "ANXIETE_EXAMENS",
        question: "أشعر بالقلق عندما يعلن الأستاذ عن مواعيد الإمتحانات القادمة.",
        options: [
          { value: 1, text: "لا يحدث أبدا" },
          { value: 2, text: "يحدث أحيانا" },
          { value: 3, text: "يحدث غالبا" },
          { value: 4, text: "يحدث دائما" }
        ]
      }
];

const AnxietyExams: React.FC = () => {
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
          <h1 className="text-2xl font-bold mb-6">Test d'Anxiété face aux examens</h1>
          
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

export default AnxietyExams;

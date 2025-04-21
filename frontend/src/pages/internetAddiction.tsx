
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
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تقضي وقتا أطول مما كنت تنوي قضاءه أمام الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q2",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تهمل الواجبات اليومية لقضاء وقت أطول على الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q3",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تفضل الجلوس أمام الانترنت على الجلوس مع أسرتك؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q4",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل أنت سعيد بجلوسك وقت أطول أمام شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q5",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل يتضايق الآخرون المحيطون بك من الوقت الطويل الذي تقضيه أمام الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q6",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تكون علاقات اجتماعية مع الآخرين عبر الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q7",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تأثرت نتائجك أو واجباتك الحياتية بسبب الوقت الذي تستغرقه على الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q8",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تفحص بريدك الإلكتروني قبل عمل أي شيء آخر يجب عليك عمله؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q9",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تأثر أداؤك أو نتائجك في المدرسة بسبب الجلوس أمام الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q10",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تخفي أسماء المواقع التي تزورها على الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q11",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تجلس أمام الانترنت للتخلص من الأفكار المزعجة؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q12",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل ترى أن الحياة بدون الانترنت ستكون مملة وفارغة وكئيبة؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q13",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تغضب عندما يزعجك أحد وأنت تستخدم شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q14",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تفضل الجلوس أمام شبكة الانترنت عن النوم مبكرا؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q15",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر أنك فشلت في تقليص المدة الزمنية التي تقضيها أمام الانترنت على الرغم من محاولتك ذلك؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q16",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تخفي على الآخرين عدد الساعات التي تقضيها أمام شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q17",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تفضل الجلوس أمام شبكة الانترنت عن الخروج مع أصدقائك؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q18",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر بالإحباط عندما تكون بعيدا عن شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q19",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تقترض مبالغ مالية من الآخرين لاستعمال الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q20",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر بحاجتك لساعات أطول لتصفح شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q21",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل يختفي شعورك بالإحباط والضيق عندما تجلس أمام شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q22",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر أنه لا يمكنك الاستغناء عن شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q23",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر أن المدة الزمنية التي تقضيها أمام شبكة الانترنت تسبب لك مشاكل مع أسرتك؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q24",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل ترى أن الجلوس أمام شبكة الانترنت أفضل من الخروج للتنزه مع الأصدقاء؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q25",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر أن الجلوس أمام شبكة الانترنت أفضل من مساعدة أسرتك في قضاء احتياجاتها؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q26",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر بالكسل والنفور في الصباح نتيجة سهرك أمام شبكة الانترنت؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      },
      {
        "name": "Q27",
        "diagnostique": "DEPENDANCE_INTERNET",
        "question": "هل تشعر بالمتعة عند تصفحك لمواقع شبكة الانترنت على الرغم من التكلفة المادية والإرهاق الذي سببه ذلك لك؟",
        "options": [
          { "value": 1, "text": "في كل الأوقات" },
          { "value": 2, "text": "في معظم الوقت" },
          { "value": 3, "text": "بصورة متوسطة" },
          { "value": 4, "text": "في بعض الأوقات" },
          { "value": 5, "text": "على الاطلاق" }
        ]
      }
];

const InternetAddiction: React.FC = () => {
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
          <h1 className="text-2xl font-bold mb-6">Test d'addiction à internet</h1>
          
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

export default InternetAddiction;

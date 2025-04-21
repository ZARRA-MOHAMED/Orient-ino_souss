
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/MainLayout";

// Questions fictives pour le test OCEAN (Big Five)
const anxityManifistQuestions = [
  {
    name: "Q1",
    diagnostique: "ANXIETE_SINCERE",
    question: "نومي مضطرب ومتقطع.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q2",
    diagnostique: "ANXIETE_SINCERE",
    question: "مخاوفي كبيرة جدا بالقابلة بأصدقائي.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q3",
    diagnostique: "ANXIETE_SINCERE",
    question: "تمر علي أبام لا أنم بسبب القلق.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q4",
    diagnostique: "ANXIETE_SINCERE",
    question: "أمتقد أنني أكثر عصيلة من الأخرين.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q5",
    diagnostique: "ANXIETE_SINCERE",
    question: "أعاني كل مدة البل بن كوابيس بزجمة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q6",
    diagnostique: "ANXIETE_SINCERE",
    question: "أعاني من الأمور بلغدة في كثير من الأحيان.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q7",
    diagnostique: "ANXIETE_SINCERE",
    question: "طالبا ما الحمل أن يدأو بتشملن مساء اليوم في حمل.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q8",
    diagnostique: "ANXIETE_SINCERE",
    question: "أعاني كبيرًا من الأسبال.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q9",
    diagnostique: "ANXIETE_SINCERE",
    question: "أضمر بالراحة أثناء التفكير في أمور العمل والبال(م).",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q10",
    diagnostique: "ANXIETE_SINCERE",
    question: "سيبوي نورات من العامل.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q11",
    diagnostique: "ANXIETE_SINCERE",
    question: "أحتى أن يحمر وجهي جهاد.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q12",
    diagnostique: "ANXIETE_SINCERE",
    question: "دائما أضمر بالحوق.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q13",
    diagnostique: "ANXIETE_SINCERE",
    question: "أصبح كذلك باللغة ثانية في اللغة بالنفس (م).",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q14",
    diagnostique: "ANXIETE_SINCERE",
    question: "آتعب بسيولة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q15",
    diagnostique: "ANXIETE_SINCERE",
    question: "الانتخلال يحملي صحيح جدا.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q16",
    diagnostique: "ANXIETE_SINCERE",
    question: "كبيرًا ما أضمر بالدورة لدرجة أجهزة عن النوم.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q17",
    diagnostique: "ANXIETE_SINCERE",
    question: "عامة لأخرى هادئا، وفي نهم يستغيير.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q18",
    diagnostique: "ANXIETE_SINCERE",
    question: "تمر بي فترة من الدورة لا استطع الجارس طوالاً.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q19",
    diagnostique: "ANXIETE_SINCERE",
    question: "أنا صيديو أو نفس الأوقاف",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q20",
    diagnostique: "ANXIETE_SINCERE",
    question: "من الصعب على جدا الفيكور أثناء أداء العمل.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q21",
    diagnostique: "ANXIETE_SINCERE",
    question: "دائما أضمر بالقلق دون جزر.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q22",
    diagnostique: "ANXIETE_SINCERE",
    question: "عندما أضاهما مشاجرة أحد منها.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q23",
    diagnostique: "ANXIETE_SINCERE",
    question: "أضمن أن أكون حميدًا مثل الأخرين.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q24",
    diagnostique: "ANXIETE_SINCERE",
    question: "دائما ينظيم شعور بالقلق على أشياء طاعمة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q25",
    diagnostique: "ANXIETE_SINCERE",
    question: "أضمر بأن عدم القاعدة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q26",
    diagnostique: "ANXIETE_SINCERE",
    question: "كثيرا ما أشعر بأن سوء أنفس من الحسين والمحجر.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q27",
    diagnostique: "ANXIETE_SINCERE",
    question: "أعرفه كثيرا بسهولة حتى في الأيام الباردة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q28",
    diagnostique: "ANXIETE_SINCERE",
    question: "الجهاز بالنسبة في مساعدة دائمة (٢).",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q29",
    diagnostique: "ANXIETE_SINCERE",
    question: "أن يتم تناول دائماً لخالف من الحيوان.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q30",
    diagnostique: "ANXIETE_SINCERE",
    question: "أن يلاحظه أشعر بالحيوان من نفسه.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q31",
    diagnostique: "ANXIETE_SINCERE",
    question: "كثيرا ما أشعر أن يلي يحقق بسرعة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q32",
    diagnostique: "ANXIETE_SINCERE",
    question: "أكي بسهولة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q33",
    diagnostique: "ANXIETE_SINCERE",
    question: "حقيبة أضيفية وأنمخاض لا يمكنهم بأدائي.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q34",
    diagnostique: "ANXIETE_SINCERE",
    question: "انثير كبيرا بالخدمات.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q35",
    diagnostique: "ANXIETE_SINCERE",
    question: "أعاني كثيرا من الصناع.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q36",
    diagnostique: "ANXIETE_SINCERE",
    question: "أشعر بالغلق في أمور وأضيفة لا تهدفها.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q37",
    diagnostique: "ANXIETE_SINCERE",
    question: "استطيع العالم بواجباتك للدرسة جديدة ومع كثيرا؟",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q38",
    diagnostique: "ANXIETE_SINCERE",
    question: "من السيد جدا أرتباه ولقطة له أعلى في أرتباه بسهولة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q39",
    diagnostique: "ANXIETE_SINCERE",
    question: "أشعر بأن عديم القاعدة، أعتقد أحباباً إلى لا أصابع مبارزة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q40",
    diagnostique: "ANXIETE_SINCERE",
    question: "أن تمتضي متوفر جدا.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q41",
    diagnostique: "ANXIETE_SINCERE",
    question: "عندما أرتباه أحباباً أشهر وسقط العرق مع بسهولة صافي.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q42",
    diagnostique: "ANXIETE_SINCERE",
    question: "لا أشعر بالحيوان عندما تعمد إلى الآخرين؟",
    options: [
      { value: 0, text: "نعم" },
      { value: 1, text: "لا" }
    ]
  },
  {
    name: "Q43",
    diagnostique: "ANXIETE_SINCERE",
    question: "أن حساب أكثر من الآخرين.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q44",
    diagnostique: "ANXIETE_SINCERE",
    question: "يرجى أي أقراف خصيلة أو أسقطع الغالب عليها.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q45",
    diagnostique: "ANXIETE_SINCERE",
    question: "استطيع أن أحد مثلا لا تحسين المتفكل.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q46",
    diagnostique: "ANXIETE_SINCERE",
    question: "إبداع وقضاي وإختارة والعلاقة.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q47",
    diagnostique: "ANXIETE_SINCERE",
    question: "طالباً ما أحلم مجاحات من الأفضل إلا أشهر أحد بها.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q48",
    diagnostique: "ANXIETE_SINCERE",
    question: "تنتجني اللغة بالنفس.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q49",
    diagnostique: "ANXIETE_SINCERE",
    question: "قليل ما يحصل إلى إنسانات تصنيفي.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  },
  {
    name: "Q50",
    diagnostique: "ANXIETE_SINCERE",
    question: "يحمر وجهي من الفجل.",
    options: [
      { value: 1, text: "نعم" },
      { value: 0, text: "لا" }
    ]
  }
];

const AnixityManifist = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const currentQuestion = anxityManifistQuestions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.name]: value
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < anxityManifistQuestions.length - 1) {
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
    navigate("/diagnostics/ocean/results");
  };
  
  const isLastQuestion = currentQuestionIndex === anxityManifistQuestions.length - 1;
  const isAnswered = answers[currentQuestion.name] !== undefined;
  const progressPercentage = ((currentQuestionIndex + 1) / anxityManifistQuestions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Test de personnalité anxity manifist</h1>
          
          <div className="mb-6 bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-orientpro-indigo h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Question {currentQuestionIndex + 1}/{anxityManifistQuestions.length}</CardTitle>
              <CardDescription>
                Indiquez à quel point vous êtes d'accord avec chaque affirmation.
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
                  className="bg-orientpro-indigo hover:bg-orientpro-indigo/90"
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
            <p>Ce test comprend normalement 40-60 questions. Cette version est abrégée pour démonstration.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnixityManifist;

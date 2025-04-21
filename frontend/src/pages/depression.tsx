
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
        diagnostique: "DEPRESSION",
        axis: "الحزن",
        options: [
          { value: 0, text: "لا أشعر بالحزن" },
          { value: 1, text: "أشعر بالحزن أغلب الوقت" },
          { value: 2, text: "أنا حزين طول الوقت" },
          { value: 3, text: "أنا حزين أو غير سعيد لدرجة لا أستطيع تحملها." }
        ]
      },
      {
        name: "Q2",
        diagnostique: "DEPRESSION",
        axis: "التشاؤم",
        options: [
          { value: 0, text: "لم أفقد الأمل في المستقبل" },
          { value: 1, text: "أشعر بفقدان الأمل فيما يتعلق بمستقبلي أكثر مما مضى" },
          { value: 2, text: "لا أتوقع أن تسير الأمور بشكل جيد بالنسبة لي" },
          { value: 3, text: "أشعر بأنني لا أمل لي في المستقبل وأنه سوف يزداد سوءا." }
        ]
      },
      {
        name: "Q3",
        diagnostique: "DEPRESSION",
        axis: "الفشل السابق",
        options: [
          { value: 0, text: "لا أشعر بأنني شخص فاشل" },
          { value: 1, text: "لقد فشلت أكثر مما ينبغي" },
          { value: 2, text: "أشعر بأنني شخص فاشل تماما." },
          { value: 3, text: "كلما نظرت إلى الوراء أرى الكثير من الفشل في حياتي" }
        ]
      },
      {
        name: "Q4",
        diagnostique: "DEPRESSION",
        axis: "فقدان الاستمتاع",
        options: [
          { value: 0, text: "استمتع بالأشياء بنفس قدر استمتاعي بها من قبل" },
          { value: 1, text: "لا أستمتع بأشياء بنفس القدر الذي اعتدت عليه" },
          {
            value: 2,
            text: "أحصل على قدر قليل جدا من الاستمتاع من الأشياء التي اعتدت الاستمتاع بها"
          },
          { value: 3, text: "لا أستمتع بالأشياء التي أحبها." }
        ]
      },
      {
        name: "Q5",
        diagnostique: "DEPRESSION",
        axis: "مشاعر الإثم (تأنيب الضمير)",
        options: [
          { value: 0, text: "لا أشعر بالإثم" },
          { value: 1, text: "أشعر بالإثم على العديد من الأشياء" },
          { value: 2, text: "التي قمت بها أو كان يجب أن أقوم بها ولم أقم بها ولم أفعل" },
          { value: 3, text: "أشعر بالإثم أغلب الوقت" }
        ]
      },
      {
        name: "Q6",
        diagnostique: "DEPRESSION",
        axis: "مشاعر العقاب",
        options: [
          { value: 0, text: "لا أشعر بأنه يقع على عقاب" },
          { value: 1, text: "أشعر بأنه قد يقع على عقاب" },
          { value: 2, text: "أتوقع أن يقع على عقاب" },
          { value: 3, text: "أشعر بأنه يقع على عقاب." }
        ]
      },
      {
        name: "Q7",
        diagnostique: "DEPRESSION",
        axis: "عدم حب الذات",
        options: [
          { value: 0, text: "شعوري نحو نفسي لم يتغير" },
          { value: 1, text: "فقدت الثقة في نفسي" },
          { value: 2, text: "خاب أملي في نفسي" },
          { value: 3, text: "لا أحب نفسي." }
        ]
      },
      {
        name: "Q8",
        diagnostique: "DEPRESSION",
        axis: "نقد الذات",
        options: [
          { value: 0, text: "لا أنتقد أو ألوم نفسي أكثر من المعتاد" },
          { value: 1, text: "أنتقد نفسي أكثر مما اعتدت" },
          { value: 2, text: "أنتقد نفسي على كل أخطائي" },
          { value: 3, text: "ألوم نفسي على كل ما يحدث من أشياء سيئة." }
        ]
      },
      {
        name: "Q9",
        diagnostique: "DEPRESSION",
        axis: "الأفكار أو الرغبات الانتحارية",
        options: [
          { value: 0, text: "ليس لدي أي أفكار للانتحار" },
          { value: 1, text: "أفكر أحيانا في الانتحار لكن لن أفعل ذلك" },
          { value: 2, text: "أريد أن أنتحر" },
          { value: 3, text: "قد انتحر لو سنحت لي الفرصة." }
        ]
      },
      {
        name: "Q10",
        diagnostique: "DEPRESSION",
        axis: "البكاء",
        options: [
          { value: 0, text: "لا أبكي أكثر مما اعتدت" },
          { value: 1, text: "أبكي أكثر مما اعتدت" },
          { value: 2, text: "أبكي لأبسط الأشياء" },
          { value: 3, text: "أشعر بالرغبة في البكاء، ولكن لا أستطيع." }
        ]
      },
      {
        name: "Q11",
        diagnostique: "DEPRESSION",
        axis: "التهيج والاستثارة",
        options: [
          { value: 0, text: "لست أكثر تهيجا أو استثارة عن المعتاد" },
          { value: 1, text: "أشعر بالتهيج والاستثارة أكثر من المعتاد" },
          { value: 2, text: "اهتاج أو استثار لدرجة أنه من الصعب على البقاء بدون حركة" },
          { value: 3, text: "أشعر بالتهيج والاستثارة لدرجة أني لا أستطيع التوقف عن الحركة" }
        ]
      },
      {
        name: "Q12",
        diagnostique: "DEPRESSION",
        axis: "فقدان الاهتمام",
        options: [
          { value: 0, text: "لم أفقد الاهتمام بالآخرين." },
          { value: 1, text: "أنا الآن أقل اهتماما بالآخرين أو بأي شيء آخر." },
          { value: 2, text: "فقدت أغلب اهتمامي بالآخرين والأمور الأخرى" },
          { value: 3, text: "من الصعب أن أهتم بأي شيء." }
        ]
      },
      {
        name: "Q13",
        diagnostique: "DEPRESSION",
        axis: "التردد",
        options: [
          { value: 0, text: "لازلت أتخذ قراراتي كما اعتدت على ذلك." },
          { value: 1, text: "أجد صعوبة كبيرة من المعتاد في اتخاذ القرارات." },
          { value: 2, text: "لدي صعوبة كبيرة جدا مما اعتدت في اتخاذ القرارات" },
          { value: 3, text: "أصبح على من الصعب أن أتخذ أي قرارات." }
        ]
      },
      {
        name: "Q14",
        diagnostique: "DEPRESSION",
        axis: "انعدام القيمة",
        options: [
          { value: 0, text: "لا أشعر بأنني عديم القيمة" },
          { value: 1, text: "لم أعد أعتبر نفسي ذا قيمة ونفع كما كنت سابقا." },
          { value: 2, text: "أشعر بأنني عديم القيمة بالمقارنة بالآخرين." },
          { value: 3, text: "أشعر بأنني عديم القيمة تماما." }
        ]
      },
      {
        name: "Q15",
        diagnostique: "DEPRESSION",
        axis: "فقدان الطاقة",
        options: [
          { value: 0, text: "لدي نفس القدر من الحيوية كالمعتاد" },
          { value: 1, text: "لدي قدر من الحيوية أقل مما اعتدت." },
          { value: 2, text: "ليس لدي حيوية كافية لعمل الكثير من الأشياء." },
          { value: 3, text: "ليس لدي أي قدرة لعمل أي شيء." }
        ]
      },
      {
        name: "Q16",
        diagnostique: "DEPRESSION",
        axis: "تغييرا في نمط النوم",
        options: [
          { value: 0, text: "لم يحدث لي أي تغير في نمط (نظام) نومي." },
          { value: 1, text: "أنام أكثر من المعتاد إلى حد ما. / أنام أقل من المعتاد إلى حد ما." },
          { value: 2, text: "أنام أكثر من المعتاد بشكل كبير. / أنام أقل من المعتاد بشكل كبير." },
          {
            value: 3,
            text: "أنام أغلب اليوم. / أستيقظ من نومي مبكرا ساعة أو ساعتان ولا أستطيع أن أعود للنوم مرة أخرى"
          }
        ]
      },
      {
        name: "Q17",
        diagnostique: "DEPRESSION",
        axis: "القابلية للغضب أو الانزعاج",
        options: [
          { value: 0, text: "قابليتي للغضب أو الانزعاج لم تتغير عن المعتاد." },
          { value: 1, text: "قابليتي للغضب أو الانزعاج أكبر من المعتاد." },
          { value: 2, text: "قابليتي للغضب أو الانزعاج أكبر بكثير من المعتاد." },
          { value: 3, text: "لدي قابلية للغضب أو الانزعاج طول الوقت (باستمرار)." }
        ]
      },
      {
        name: "Q18",
        diagnostique: "DEPRESSION",
        axis: "تغيرات في الشهية",
        options: [
          { value: 0, text: "لم يحدث أي تغير في شهيتي." },
          { value: 1, text: "شهيتي أقل من المعتاد إلى حد ما." },
          { value: 2, text: "شهيتي أقل كثيرا من المعتاد. / شهيتي أكبر كثيرا من المعتاد." },
          { value: 3, text: "ليست لي شهية على الإطلاق. / لدي رغبة قوية للطعام طول الوقت." }
        ]
      },
      {
        name: "Q19",
        diagnostique: "DEPRESSION",
        axis: "صعوبة التركيز",
        options: [
          { value: 0, text: "أستطيع التركيز كما المعتاد." },
          { value: 1, text: "لا أستطيع التركيز بنفس الكفاءة المعتادة." },
          { value: 2, text: "من الصعب على أن أركز عقلي على أي شيء لمدة طويلة." },
          { value: 3, text: "أجد نفسي غير قادر على التركيز على أي شيء." }
        ]
      },
      {
        name: "Q20",
        diagnostique: "DEPRESSION",
        axis: "الإرهاق أو الإجهاد",
        options: [
          { value: 0, text: "لست أكثر إرهاقا أو إجهادا من المعتاد." },
          { value: 1, text: "أصاب بالإرهاق أو الإجهاد عن عمل الكثير من الأشياء التي اعتدت عملها." },
          {
            value: 2,
            text: "يعوقني الإرهاق أو الإجهاد عن عمل الكثير من الأشياء التي اعتدت عملها."
          },
          { value: 3, text: "أنا مرهق أو مجهد جدا لعمل أغلب الأشياء التي اعتدت عليها." }
        ]
      }
];

const Depression: React.FC = () => {
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
          <h1 className="text-2xl font-bold mb-6">Test de depression</h1>
          
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
                <h3 className="text-lg font-medium">{currentQuestion.axis}</h3>
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

export default Depression;

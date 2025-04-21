import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import { RaisecAnswers, RaisecQuestion } from "@/types/diagnostics";

const RaisecTest: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<RaisecQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch questions
    const fetchQuestions = async () => {
      try {
        // In a real app, you would fetch from your API:
        // const response = await fetch('/api/raisec-questions');
        // const data = await response.json();
        
        // Mock data matching your backend structure
        const mockData: RaisecQuestion[] = [
          {
            name: "Q1",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "1",
            question: "serie1",
            options: [
              {value: "R",text: "تحب مزاولة أنشطة خارج البيت العمل في الهواء الطلق"},
              { value: "I", text: "تحب مواجهة الحالات الطارئة وغير المتوقعة" },
              { value: "A", text: "تحب كتابة رسالة ملخص أو تقرير" },
              { value: "S", text: "تحب استخدام أدوات للقياس كالمجهر مثلا" },
              { value: "E", text: "تحب تقديم خدمة ما و مساعدة الآخرين" },
              {value: "C",text: "تحب ان تعتمد على حاستك السادسة من اجل اتخاذ قرارات"}
            ]
          },
          {
            name: "Q2",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "2",
            question: "serie2",
            options: [
              { value: "C", text: "تحب الاشياء المنظمة و الواضحة و المحددة جيدا" },
              {
                value: "S",
                text: "تحب الانصات للأخريين و نصحهم من اجل ايجاد حلول"
              },
              {
                value: "E",
                text: "تحب أن تجيب عن الآراء المعارضة لمحاوريك ومحاولة اقناعهم"
              },
              { value: "A", text: "تحب عدم معرفة ما وجب عليك فعله بالضبط" },
              { value: "R", text: "تحب استخدام الأشياء والمواد التي صنعتها بنفسك" },
              {
                value: "I",
                text: "تحب ایجاد حلول للمشاكل والمسائل بشكل عقلاني وتسلسلي"
              }
            ]
          },
          {
            name: "Q3",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "3",
            question: "serie3",
            options: [
              { value: "I", text: "تحب أو ترجو إنجاز تجارب علمية" },
              { value: "A", text: "تحب العمل باستقلالية وبطريقة غير مقيدة بقواعد" },
              { value: "C", text: "تحب دعم استنتاجاتك بناء على قواعد مثبتة" },
              { value: "E", text: "تحب اقناع الاخرين بالتصرف بطريقة ما" },
              { value: "S", text: "تحب تلقين الاخرين ما تعلمته" },
              { value: "R", text: "تحب الرياضة وبذل مجهود حرکي" }
            ]
          },
          {
            name: "Q4",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "4",
            question: "serie4",
            options: [
              { value: "E", text: "هل تحب تحديد الأهداف وتنظيم انشطة الآخرين" },
              { value: "A", text: "تحب اكتساب هوايات مثل الرسم الزخرفة الشعر" },
              { value: "C", text: "تحب ممارسة نفس الأنشطة وتكرارها" },
              { value: "R", text: "تحب سياقة العربات او تشغيل الآلات" },
              { value: "S", text: "تحب العمل مع الأخرين قصد إخبارهم بما تعرف" },
              { value: "I", text: "تحب التفكير وتحليل وضعية أو مشكلة ما" }
            ]
          },
          {
            name: "Q5",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "5",
            question: "serie5",
            options: [
              { value: "E", text: "تحب القيام بحوارات صحفية وكتابة مقالات" },
              { value: "R", text: "تحب تفكيك آلة ما لإصلاحها بنفس ك" },
              { value: "A", text: "تحب حل مشكلة ما بطريقة تلقائية" },
              { value: "S", text: "تحب التميز بروح المبادرة واتخاذ قرارات سريعة" },
              { value: "C", text: "تحب القيام بالإجراءات الادارية والقانونية" },
              { value: "I", text: "تحب اتخاذ القرارات بعد التفكير بطريقة منطقية" }
            ]
          },
          {
            name: "Q6",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "6",
            question: "serie6",
            options: [
              {
                value: "S",
                text: "تحب التواجد مع أشخاص من أجل علاج من هم في حاجة إلى ذل ك"
              },
              { value: "C", text: "تحب العمل بدقة من أجل الحصول على نتائج مرضية" },
              { value: "A", text: "تحب التعبير عن أفكارك ووجهة نظرك ومشاعرك" },
              {
                value: "I",
                text: "تحب دراسة التكنولوجيا والمعلوميات والبيولوجيا والفيزياء"
              },
              { value: "R", text: "تحب صناعة أو إصلاح بعض الأشياء" },
              { value: "E", text: "تحب مشاركة مؤسسة ما لتحقيق أهدافها" }
            ]
          },
          {
            name: "Q7",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "7",
            question: "serie7",
            options: [
              {
                value: "E",
                text: "تحب مناقشة تاجر ما للحصول على تخفيضات في الثمن"
              },
              { value: "S", text: "تحب العمل مع اشخاص اخرين قصد تكوينهم" },
              {
                value: "C",
                text: "تحب الانشغال بعمل واحد في آن واحد كي لا تشتت انتباه ك"
              },
              { value: "A", text: "تحب ابتكار حلول تخرج عن المعتاد" },
              {
                value: "R",
                text: "تحب استعمال أدوات مثل مفك البراغي والمقص والملقط"
              },
              {
                value: "I",
                text: "تحب البحث عن فهم وتفسير أسباب وجود الأشياء والكائنات"
              }
            ]
          },
          {
            name: "Q8",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "8",
            question: "serie8",
            options: [
              {
                value: "A",
                text: "تحب التواجد مع أشخاص يمتلكون مواهب وقدرات فنية"
              },
              {
                value: "I",
                text: "تحب الاعتماد على تفكيرك الخاص لتقرير كيفية إنجاز الأعمال"
              },
              { value: "R", text: "تحب جمع الأشياء كالأحجار والزهور" },
              {
                value: "E",
                text: "تحب التواجد مع من يشتغل لجني الكثير من الأموال"
              },
              {
                value: "C",
                text: "تحب ترتيب وتنظيم الوثائق المستندات وأشياء أخرى"
              },
              {
                value: "S",
                text: "تحب الإنصات الحوار والمشاركة ومحاولة فهم الآخرين"
              }
            ]
          },
          {
            name: "Q9",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "9",
            question: "serie9",
            options: [
              {
                value: "E",
                text: "تحب التجارة في المواد أو الخدمات مثل خدمة ما بعد البيع"
              },
              { value: "S", text: "تحب العمل مع الآخرين" },
              { value: "R", text: "تحب استعمال الآلات لصنع بعض الأشياء" },
              { value: "I", text: "تحب دراسة حلول أو ابتكارها لحل مشكلة ما" },
              {
                value: "C",
                text: "تحب المهن التي تقض ي فيها وقتك لقراءة الوثائق المكتوبة والسجلات"
              },
              { value: "A", text: "تحب تحسين أساليب العمل" }
            ]
          },
          {
            name: "Q10",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "10",
            question: "serie10",
            options: [
              {
                value: "E",
                text: "تحب القيام بأنشطة متعددة في وقت واحد أو المرور من نشاط إلى آخر بالتوالي"
              },
              { value: "S", text: "تحب تسيير نقاش او حوار" },
              { value: "A", text: "تحب التعرف على أشخاص جدد" },
              { value: "C", text: "تحب احترام القواعد والقيم التي تلتزم بها" },
              { value: "I", text: "تحب دراسة الأشياء الظواهر أو السلوكيات" },
              { value: "R", text: "تحب الطبيعة النباتات الحيوانات" }
            ]
          },
          {
            name: "Q11",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "11",
            question: "serie11",
            options: [
              { value: "R", text: "تحب مواجهة ورفع التحديات" },
              { value: "E", text: "تحب تسيير الأنشطة الجماعية و التشاركية" },
              { value: "I", text: "تحب اغناء معلوماتك عن طريق الدراسة" },
              {
                value: "C",
                text: "تحب أن يكون عملك مؤديا الى نتائج محددة وملموسة"
              },
              { value: "A", text: "تحب إبراز ابداعاتك" },
              { value: "S", text: "تحب اتباع خطة عمل للوصول الى أفضل نتيجة" }
            ]
          },
          {
            name: "Q12",
            diagnostique: "67f903195ec716ac107c4154",
            chaine: "12",
            question: "serie12",
            options: [
              { value: "I", text: "تحب فهم كيفية عمل آلة ما" },
              { value: "S", text: "تحب تبادل الأفكار مع الاخرين" },
              { value: "C", text: "تحب العمل بالأرقام" },
              { value: "E", text: "تحب تقرير ما يجب أن يقام به" },
              {
                value: "R",
                text: "تحب التأكد من النتائج مستعينا بالتجارب بالاختبارات او المراقبة"
              },
              { value: "A", text: "تحب التغييرات او الوضعيات الغير المتوقعة" }
            ]
          }
        ]
        ;

        setQuestions(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestionIndex];
    setAnswers((prev) => {
      const currentAnswers = prev[question.name] || [];
      
      // Toggle selection
      const updatedAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      
      // Keep only 3 selections max
      const finalAnswers = updatedAnswers.slice(0, 3);
      
      return { ...prev, [question.name]: finalAnswers };
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Verify all questions have exactly 3 answers
    const allAnswered = questions.every(q => 
      answers[q.name] && answers[q.name].length === 3
    );
    
    if (!allAnswered) {
      toast.error("Please select exactly 3 options for each question");
      return;
    }

    setIsSubmitting(true);

    // Prepare submission data
    const submissionData: RaisecAnswers = {
      userID: '1', // Replace with actual user ID in your app
      diagID: 'RAISEC',
      answers: questions.map(q => ({
        question: q.name,
        answers: answers[q.name]
      }))
    };

    console.log("Submitting answers:", submissionData);
    
    // In a real app, you would submit to your API here
    // Example:
    // try {
    //   const response = await fetch('/api/submit-raisec', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(submissionData)
    // });
    //   const result = await response.json();
    //   navigate("/diagnostics/raisec/results");
    // } catch (error) {
    //   toast.error("Submission failed");
    //   setIsSubmitting(false);
    // }

    // Simulate API call
    setTimeout(() => {
      navigate("/diagnostics/raisec/results");
    }, 1500);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;
  
  const isCurrentQuestionAnswered = currentQuestion && 
    answers[currentQuestion.name]?.length === 3;
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-orientpro-blue mb-4" />
          <p className="text-lg text-gray-600">Loading RAISEC test...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">RAISEC Test</h1>
            <p className="text-gray-600 mb-4">
              Discover your professional interests profile according to the RAISEC model (Realistic, Artistic, Investigative, Social, Enterprising, Conventional).
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% completed</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {currentQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-lg font-medium text-gray-800">
                  {currentQuestion.question}
                </CardDescription>
                <div className="text-sm text-orientpro-blue">
                  {answers[currentQuestion.name]?.length || 0}/3 selections
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.name]?.includes(option.value);
                    const selectionIndex = isSelected 
                      ? answers[currentQuestion.name].indexOf(option.value) + 1
                      : null;

                    return (
                      <div
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border ${
                          isSelected
                            ? "border-orientpro-blue bg-orientpro-blue/5"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        } transition-colors cursor-pointer`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <div className={`mr-3 flex items-center justify-center h-5 w-5 rounded-full border ${
                          isSelected 
                            ? "bg-orientpro-blue border-orientpro-blue" 
                            : "border-gray-400"
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <Label className="flex-grow cursor-pointer">
                          {option.text}
                        </Label>
                        {isSelected && (
                          <div className="ml-2 text-xs text-orientpro-blue">
                            #{selectionIndex}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex space-x-2">
                  {isLastQuestion ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isCurrentQuestionAnswered || isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={goToNextQuestion}
                      disabled={!isCurrentQuestionAnswered}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium mb-2">About the RAISEC Test</h3>
            <p className="text-sm text-gray-600">
              The RAISEC model, also known as the RIASEC model or Holland's theory,
              identifies six types of professional personality. Your results will help you
              understand which work environments and professions best match your personality.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RaisecTest;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import MainLayout from "@/layouts/MainLayout";
// import { RaisecQuestion } from "@/types/diagnostics";

// // Exemple de questions RAISEC pour la démonstration
// const mockRaisecQuestions: RaisecQuestion[] = [
//   {
//     name: "Q1",
//     diagnostique: "RAISEC",
//     axis: "R",
//     chain: "R",
//     question: "J'aime réparer des objets mécaniques",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
//   {
//     name: "Q2",
//     diagnostique: "RAISEC",
//     axis: "I",
//     chain: "I",
//     question: "J'aime résoudre des problèmes mathématiques",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
//   {
//     name: "Q3",
//     diagnostique: "RAISEC",
//     axis: "A",
//     chain: "A",
//     question: "J'aime faire de la peinture, du dessin ou de la sculpture",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
//   {
//     name: "Q4",
//     diagnostique: "RAISEC",
//     axis: "S",
//     chain: "S",
//     question: "J'aime aider les autres à résoudre leurs problèmes personnels",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
//   {
//     name: "Q5",
//     diagnostique: "RAISEC",
//     axis: "E",
//     chain: "E",
//     question: "J'aime influencer ou persuader les autres",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
//   {
//     name: "Q6",
//     diagnostique: "RAISEC",
//     axis: "C",
//     chain: "C",
//     question: "J'aime travailler avec des nombres selon des procédures bien définies",
//     options: [
//       { value: 1, text: "Pas du tout" },
//       { value: 2, text: "Un peu" },
//       { value: 3, text: "Modérément" },
//       { value: 4, text: "Beaucoup" },
//       { value: 5, text: "Énormément" },
//     ],
//   },
// ];

// const RaisecTest: React.FC = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState<RaisecQuestion[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, number>>({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Simulation d'un chargement des questions depuis une API
//     setTimeout(() => {
//       setQuestions(mockRaisecQuestions);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const handleAnswer = (value: number) => {
//     const question = questions[currentQuestionIndex];
//     setAnswers((prev) => ({ ...prev, [question.name]: value }));
//   };

//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const goToPreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmit = () => {
//     // Vérifiez que toutes les questions ont été répondues
//     if (Object.keys(answers).length !== questions.length) {
//       toast.error("Veuillez répondre à toutes les questions avant de soumettre");
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulation de l'envoi des réponses à une API
//     setTimeout(() => {
//       console.log("Submitting answers:", answers);
//       navigate("/diagnostics/raisec/results");
//     }, 1500);
//   };

//   const currentQuestion = questions[currentQuestionIndex];
//   const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
//   const isCurrentQuestionAnswered = currentQuestion && answers[currentQuestion.name] !== undefined;
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   if (isLoading) {
//     return (
//       <MainLayout>
//         <div className="container py-20 flex flex-col items-center justify-center">
//           <Loader2 className="h-12 w-12 animate-spin text-orientpro-blue mb-4" />
//           <p className="text-lg text-gray-600">Chargement du test RAISEC...</p>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="container py-10">
//         <div className="max-w-3xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Test RAISEC</h1>
//             <p className="text-gray-600 mb-4">
//               Découvrez votre profil d'intérêts professionnels selon le modèle RAISEC (Réaliste, Artistique, Investigateur, Social, Entreprenant, Conventionnel).
//             </p>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
//                 <span>{Math.round(progress)}% complété</span>
//               </div>
//               <Progress value={progress} className="h-2" />
//             </div>
//           </div>

//           {currentQuestion && (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
//                 <CardDescription className="text-lg font-medium text-gray-800">
//                   {currentQuestion.question}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RadioGroup
//                   value={answers[currentQuestion.name]?.toString()}
//                   onValueChange={(value) => handleAnswer(parseInt(value))}
//                   className="space-y-3"
//                 >
//                   {currentQuestion.options.map((option) => (
//                     <div
//                       key={option.value}
//                       className={`flex items-center p-3 rounded-lg border ${
//                         answers[currentQuestion.name] === option.value
//                           ? "border-orientpro-blue bg-orientpro-blue/5"
//                           : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                       } transition-colors cursor-pointer`}
//                       onClick={() => handleAnswer(option.value)}
//                     >
//                       <RadioGroupItem
//                         value={option.value.toString()}
//                         id={`option-${option.value}`}
//                         className="mr-3"
//                       />
//                       <Label
//                         htmlFor={`option-${option.value}`}
//                         className="flex-grow cursor-pointer"
//                       >
//                         {option.text}
//                       </Label>
//                       {answers[currentQuestion.name] === option.value && (
//                         <Check className="h-4 w-4 text-orientpro-blue" />
//                       )}
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </CardContent>
//               <CardFooter className="flex justify-between pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={goToPreviousQuestion}
//                   disabled={currentQuestionIndex === 0}
//                 >
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                   Précédent
//                 </Button>
//                 <div className="flex space-x-2">
//                   {isLastQuestion ? (
//                     <Button
//                       onClick={handleSubmit}
//                       disabled={!isCurrentQuestionAnswered || isSubmitting}
//                       className="min-w-[120px]"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                           Envoi...
//                         </>
//                       ) : (
//                         "Terminer"
//                       )}
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={goToNextQuestion}
//                       disabled={!isCurrentQuestionAnswered}
//                     >
//                       Suivant
//                       <ChevronRight className="h-4 w-4 ml-1" />
//                     </Button>
//                   )}
//                 </div>
//               </CardFooter>
//             </Card>
//           )}

//           <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <h3 className="text-sm font-medium mb-2">À propos du test RAISEC</h3>
//             <p className="text-sm text-gray-600">
//               Le modèle RAISEC, également connu sous le nom de modèle RIASEC ou théorie de Holland, 
//               identifie six types de personnalité professionnelle. Vos résultats vous aideront à 
//               comprendre quels environnements de travail et quelles professions correspondent le mieux 
//               à votre personnalité.
//             </p>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default RaisecTest;


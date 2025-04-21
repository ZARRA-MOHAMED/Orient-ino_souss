
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
    id: "q1",
    question: "Je me sens nerveux(se), anxieux(se) ou sur les nerfs.",
    options: [
      { value: "0", label: "Jamais" },
      { value: "1", label: "Quelques jours" },
      { value: "2", label: "Plus de la moitié du temps" },
      { value: "3", label: "Presque tous les jours" }
    ]
  },
  {
    id: "q2",
    question: "Je suis incapable d'arrêter de m'inquiéter ou de contrôler mes inquiétudes.",
    options: [
      { value: "0", label: "Jamais" },
      { value: "1", label: "Quelques jours" },
      { value: "2", label: "Plus de la moitié du temps" },
      { value: "3", label: "Presque tous les jours" }
    ]
  },
  {
    id: "q3",
    question: "Je m'inquiète trop à propos de différentes choses.",
    options: [
      { value: "0", label: "Jamais" },
      { value: "1", label: "Quelques jours" },
      { value: "2", label: "Plus de la moitié du temps" },
      { value: "3", label: "Presque tous les jours" }
    ]
  },
  {
    id: "q4",
    question: "J'ai du mal à me détendre.",
    options: [
      { value: "0", label: "Jamais" },
      { value: "1", label: "Quelques jours" },
      { value: "2", label: "Plus de la moitié du temps" },
      { value: "3", label: "Presque tous les jours" }
    ]
  },
  {
    id: "q5",
    question: "Je suis si agité(e) qu'il est difficile de rester tranquille.",
    options: [
      { value: "0", label: "Jamais" },
      { value: "1", label: "Quelques jours" },
      { value: "2", label: "Plus de la moitié du temps" },
      { value: "3", label: "Presque tous les jours" }
    ]
  }
];

const AnxietyTest: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const currentQuestion = anxietyQuestions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
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
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const progressPercentage = ((currentQuestionIndex + 1) / anxietyQuestions.length) * 100;
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Test d'Anxiété</h1>
          
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
                  value={answers[currentQuestion.id]} 
                  onValueChange={handleAnswerChange}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                        <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="flex-grow cursor-pointer">
                          {option.label}
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

export default AnxietyTest;

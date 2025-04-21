
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart2, Home } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

// Types fictifs pour les résultats des tests
interface TestResult {
  testId: string;
  testName: string;
  testDescription: string;
  score: number;
  maxScore: number;
  interpretation: string;
  level: "low" | "medium" | "high";
  recommendations: string[];
}

const mockResults: Record<string, TestResult> = {
  "anxiety": {
    testId: "anxiety",
    testName: "Test d'Anxiété",
    testDescription: "Évaluation de votre niveau d'anxiété générale",
    score: 8,
    maxScore: 15,
    interpretation: "Votre score indique un niveau d'anxiété modéré. Bien que vous ressentiez occasionnellement de l'anxiété, celle-ci ne semble pas perturber significativement votre vie quotidienne.",
    level: "medium",
    recommendations: [
      "Pratiquez régulièrement des techniques de relaxation comme la respiration profonde",
      "Limitez la consommation de caféine qui peut augmenter l'anxiété",
      "Envisagez de parler à un conseiller d'orientation de votre établissement"
    ]
  },
  "ocean": {
    testId: "ocean",
    testName: "Test de personnalité Big Five (OCEAN)",
    testDescription: "Évaluation de vos traits de personnalité fondamentaux",
    score: 0,
    maxScore: 0,
    interpretation: "Les résultats du test Big Five ne sont pas représentés par un score unique, mais plutôt par cinq dimensions différentes qui sont affichées graphiquement ci-dessous.",
    level: "medium",
    recommendations: [
      "Utilisez votre profil OCEAN pour explorer des carrières qui correspondent à vos traits de personnalité",
      "Tenez compte de ces traits lors de la recherche d'environnements d'études ou de travail adaptés"
    ]
  }
};

const TestResults: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [result, setResult] = useState<TestResult | null>(null);
  
  useEffect(() => {
    // Dans une implémentation réelle, vous feriez un appel API pour récupérer les résultats
    // Simulation d'un appel API avec un délai
    const timer = setTimeout(() => {
      if (testId && mockResults[testId]) {
        setResult(mockResults[testId]);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [testId]);
  
  if (!result) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 max-w-[300px] mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 max-w-[400px] mx-auto"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Résultats : {result.testName}</h1>
          <p className="text-gray-600 mb-8">
            {result.testDescription}
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Votre score</CardTitle>
              <CardDescription>
                Résultat basé sur vos réponses au questionnaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result.score > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span className="font-medium">{result.score} / {result.maxScore}</span>
                  </div>
                  <Progress 
                    value={(result.score / result.maxScore) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>Faible</span>
                    <span>Modéré</span>
                    <span>Élevé</span>
                  </div>
                </div>
              )}
              
              <div className={`mt-6 p-4 rounded-md ${
                result.level === 'low' 
                  ? 'bg-green-50 text-green-800' 
                  : result.level === 'medium'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'bg-red-50 text-red-800'
              }`}>
                <h3 className="font-medium mb-2">Interprétation</h3>
                <p>{result.interpretation}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-orientpro-blue">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Link to="/diagnostics">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" /> Retour aux diagnostics
              </Button>
            </Link>
            <Link to="/careers">
              <Button>
                Découvrir les métiers adaptés <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TestResults;

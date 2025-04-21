
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart2, Brain, FileQuestion, HelpCircle, MessagesSquare, Smile, TimerIcon } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

interface DiagnosticCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  progress?: number;
  completed?: boolean;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({
  title,
  description,
  icon,
  path,
  color,
  progress = 0,
  completed = false,
}) => {
  return (
    <Card className="h-full orientpro-card">
      <CardHeader>
        <div className={`h-12 w-12 ${color} rounded-lg flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {completed ? (
          <div className="flex items-center text-green-600">
            <div className="rounded-full bg-green-100 p-1 mr-2">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Test complété</span>
          </div>
        ) : progress > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <TimerIcon className="h-4 w-4 mr-2" />
            <span className="text-sm">Estimation: 10-15 min</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={path} className="w-full">
          <Button
            variant={completed ? "outline" : "default"}
            className={`w-full ${completed ? "border-green-600 text-green-600 hover:bg-green-50" : ""}`}
          >
            {completed ? "Voir les résultats" : "Commencer le test"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Diagnostics: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Tests de diagnostic</h1>
          <p className="text-gray-600 mb-8">
            Découvrez vos traits de personnalité, aptitudes et préférences professionnelles grâce à nos tests scientifiquement validés.
          </p>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Tests essentiels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DiagnosticCard
                title="RAISEC"
                description="Identifiez vos intérêts professionnels selon les 6 types de personnalité: Réaliste, Artistique, Investigateur, Social, Entreprenant et Conventionnel."
                icon={<BarChart2 className="h-6 w-6 text-orientpro-blue" />}
                path="/diagnostics/raisec"
                color="bg-orientpro-blue/10"
                completed={true}
              />
              
              <DiagnosticCard
                title="Big Five (OCEAN)"
                description="Évaluez les cinq grands traits de personnalité: Ouverture, Conscienciosité, Extraversion, Amabilité et Névrosisme."
                icon={<Brain className="h-6 w-6 text-orientpro-indigo" />}
                path="/diagnostics/ocean"
                color="bg-orientpro-indigo/10"
              />
            </div>
            
            <h2 className="text-xl font-semibold pt-6">Tests complémentaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DiagnosticCard
                title="Anxiété manifeste"
                description="Évaluez votre niveau d'anxiété générale et son impact sur votre vie quotidienne."
                icon={<MessagesSquare className="h-6 w-6 text-orientpro-purple" />}
                path="/diagnostics/anxiety-manifeste"
                color="bg-orientpro-purple/10"
              />
              
              <DiagnosticCard
                title="Anxiété liée aux examens"
                description="Mesurez votre niveau de stress lié aux situations d'évaluation et d'examen."
                icon={<FileQuestion className="h-6 w-6 text-orientpro-amber" />}
                path="/diagnostics/exam-anxiety"
                color="bg-orientpro-amber/10"
                progress={30}
              />
              
              <DiagnosticCard
                title="Anxiété face à l'avenir"
                description="Évaluez votre niveau d'inquiétude concernant vos perspectives futures."
                icon={<HelpCircle className="h-6 w-6 text-orientpro-teal" />}
                path="/diagnostics/future-anxiety"
                color="bg-orientpro-teal/10"
              />
              
              <DiagnosticCard
                title="Dépression"
                description="Identifiez les symptômes dépressifs et leur intensité dans votre quotidien."
                icon={<MessagesSquare className="h-6 w-6 text-orientpro-rose" />}
                path="/diagnostics/depression"
                color="bg-orientpro-rose/10"
              />
              
              <DiagnosticCard
                title="Estime de soi"
                description="Mesurez votre niveau d'estime personnelle dans différents contextes: familial, scolaire et relationnel."
                icon={<Smile className="h-6 w-6 text-orientpro-green" />}
                path="/diagnostics/self-esteem"
                color="bg-orientpro-green/10"
              />
              
              <DiagnosticCard
                title="Addiction à internet"
                description="Évaluez votre relation avec les technologies numériques et détectez les signes de dépendance."
                icon={<Brain className="h-6 w-6 text-orientpro-slate" />}
                path="/diagnostics/internet-addiction"
                color="bg-orientpro-slate/10"
              />

              <DiagnosticCard
                title="Stress psychologique"
                description="Évaluez votre stress psychologique face aux différentes difficultés de la vie."
                icon={<Brain className="h-6 w-6 text-orientpro-amber" />}
                path="/diagnostics/stress-psychologique"
                color="bg-orientpro-amber/10"
              />
            </div>
          </div>
          
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Pourquoi passer ces tests?</h3>
            <p className="text-gray-700 mb-4">
              Nos diagnostics vous aident à mieux vous comprendre et à identifier les domaines professionnels 
              qui correspondent le mieux à votre personnalité. Les résultats de ces tests sont utilisés pour 
              générer des recommandations personnalisées de métiers et de parcours scolaires.
            </p>
            <div className="flex items-center text-orientpro-blue">
              <p className="text-sm font-medium">
                Nous recommandons de commencer par le test RAISEC pour obtenir une première évaluation de vos intérêts professionnels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Diagnostics;

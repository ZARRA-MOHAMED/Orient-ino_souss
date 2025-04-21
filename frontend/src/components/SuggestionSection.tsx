import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SuggestionCard from "./SuggestionCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Type pour les résultats des tests
type TestResults = {
  OCEAN: {
    Nevrosisme: string;
    Extraversion: string;
    Ouverture_esprit: string;
    Amabilite: string;
    Precision: string;
    Maitrise: string;
  };
  RAISEC: {
    R: string;
    A: string;
    I: string;
    S: string;
    E: string;
    C: string;
  };
  SINCERE_ANXIETY: string;
  EXAMS_ANXIETY: string;
  FUTUR_ANXIETY: string;
  DEPRESSION: string;
  SELF_ESTEEM: {
    familiale: string;
    scolaire: string;
    sociale: string;
  };
  INTERNET_ADDICTION: string;
  PSYCHOLOGICAL_PRESSURE: string;
};

// Initialisation de l'API Gemini
const genAI = new GoogleGenerativeAI("AIzaSyAW07PuiFAZCy1TWRr18f_rczoMPV0lKFs");

async function generateImprovementSuggestions(results: TestResults): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Analysez les résultats de test suivants d'un étudiant et générez des suggestions d'amélioration concrètes 
    et personnalisées en français. Concentrez-vous sur les points faibles identifiés et proposez des solutions 
    pratiques et réalisables.

    Résultats:
    - Personnalité (OCEAN):
      * Névrosisme: ${results.OCEAN.Nevrosisme}
      * Extraversion: ${results.OCEAN.Extraversion}
      * Ouverture d'esprit: ${results.OCEAN.Ouverture_esprit}
      * Amabilité: ${results.OCEAN.Amabilite}
      * Précision: ${results.OCEAN.Precision}
      * Maîtrise: ${results.OCEAN.Maitrise}

    - Intérêts professionnels (RAISEC):
      Réaliste: ${results.RAISEC.R}
      Investigatif: ${results.RAISEC.I}
      Artistique: ${results.RAISEC.A}
      Social: ${results.RAISEC.S}
      Entreprenant: ${results.RAISEC.E}
      Conventionnel: ${results.RAISEC.C}

    - Anxiétés:
      * Anxiété manifeste: ${results.SINCERE_ANXIETY}
      * Anxiété aux examens: ${results.EXAMS_ANXIETY}
      * Anxiété future: ${results.FUTUR_ANXIETY}

    - État psychologique:
      * Dépression: ${results.DEPRESSION}
      * Estime de soi:
        - Familiale: ${results.SELF_ESTEEM.familiale}
        - Scolaire: ${results.SELF_ESTEEM.scolaire}
        - Sociale: ${results.SELF_ESTEEM.sociale}
      * Addiction internet: ${results.INTERNET_ADDICTION}
      * Stress psychologique: ${results.PSYCHOLOGICAL_PRESSURE}

    Format de réponse requis:
    - Liste numérotée en français
    - Maximum 10 suggestions
    - Phrases complètes et actionnables
    - Priorité aux domaines avec les scores les plus critiques
    - Inclure des ressources utiles (exercices, pratiques, etc.)
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Conversion de la réponse en tableau
    return text
      .split(/\d+\./)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .slice(0, 10);
  } catch (error) {
    console.error("Erreur avec l'API Gemini:", error);
    return [];
  }
}

interface SuggestionSectionProps {
  testResults: TestResults;
}

const SuggestionSection = ({ testResults }: SuggestionSectionProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await generateImprovementSuggestions(testResults);
        const fakeResults =[
          "Pratiquez des exercices de relaxation quotidiennement pour gérer l'anxiété aux examens (respiration carrée, méditation 10 minutes/jour)",
          "Renforcez votre estime de soi scolaire en listant 3 réussites académiques chaque soir",
          "Limitez l'usage d'internet avec la technique Pomodoro (25min de travail / 5min de pause)",
          "Développez vos compétences sociales via des activités de groupe (club de lecture, bénévolat)",
          "Explorez des métiers investigatifs (recherche scientifique) et artistiques (design graphique)",
          // "Améliorez la maîtrise de soi par la tenue d'un journal d'objectifs quotidiens",
          // "Consultez un conseiller d'orientation pour explorer des carrières Social/Investigatif",
          // "Utilisez des applications de mindfulness (Headspace) pour réduire le stress chronique",
          // "Planifiez des sessions de revision courtes et régulières pour diminuer l'anxiété future",
          // "Participez à des ateliers de développement personnel pour renforcer l'amabilité"
        ]
        setSuggestions(fakeResults);
      } catch (err) {
        console.error("Erreur lors de la génération des suggestions:", err);
        setError("Impossible de générer des suggestions pour le moment. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [testResults]);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700">Suggestions d'amélioration</CardTitle>
        <CardDescription>
          Recommandations personnalisées basées sur vos résultats de tests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} index={index} />
              ))
            ) : !error ? (
              <p className="text-center text-gray-500 py-6">Aucune suggestion disponible.</p>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestionSection;
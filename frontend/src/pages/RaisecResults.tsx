
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Share2 } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

// Exemple de données RAISEC pour la démonstration
const raisecData = [
  { subject: 'Réaliste', value: 75, fullMark: 100 },
  { subject: 'Investigateur', value: 85, fullMark: 100 },
  { subject: 'Artistique', value: 60, fullMark: 100 },
  { subject: 'Social', value: 40, fullMark: 100 },
  { subject: 'Entreprenant', value: 70, fullMark: 100 },
  { subject: 'Conventionnel', value: 50, fullMark: 100 },
];

const RaisecResults: React.FC = () => {
  // Identifiez le type dominant et secondaire
  const sortedTypes = [...raisecData].sort((a, b) => b.value - a.value);
  const dominantType = sortedTypes[0].subject;
  const secondaryType = sortedTypes[1].subject;

  const getResultDescription = () => {
    // Descriptions personnalisées basées sur le type dominant et secondaire
    const descriptions: Record<string, { short: string; long: string }> = {
      "Réaliste": {
        short: "Pratique et concret",
        long: "Vous préférez travailler avec des objets, des machines et des outils. Vous êtes généralement pratique, concret et avez de bonnes aptitudes manuelles et techniques."
      },
      "Investigateur": {
        short: "Analytique et curieux",
        long: "Vous aimez résoudre des problèmes complexes en utilisant vos capacités analytiques. Vous êtes curieux, avez un esprit scientifique et appréciez les défis intellectuels."
      },
      "Artistique": {
        short: "Créatif et expressif",
        long: "Vous valorisez l'expression personnelle et la créativité. Vous êtes intuitif, original et appréciez les environnements qui permettent l'innovation et l'imagination."
      },
      "Social": {
        short: "Coopératif et altruiste",
        long: "Vous aimez travailler avec et aider les autres. Vous êtes empathique, patient et trouvez satisfaction dans l'amélioration du bien-être des personnes."
      },
      "Entreprenant": {
        short: "Persuasif et ambitieux",
        long: "Vous appréciez prendre des initiatives et influencer les autres. Vous êtes énergique, persuasif et orienté vers les objectifs, avec de bonnes compétences en leadership."
      },
      "Conventionnel": {
        short: "Organisé et méthodique",
        long: "Vous préférez travailler avec des données et des procédures structurées. Vous êtes précis, fiable et appréciez les environnements stables et bien organisés."
      }
    };

    return {
      dominant: descriptions[dominantType],
      secondary: descriptions[secondaryType],
    };
  };

  const descriptions = getResultDescription();

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Vos résultats RAISEC</h1>
          <p className="text-gray-600 mb-8">
            Analyse de votre profil d'intérêts professionnels selon le modèle RAISEC
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche - Graphique radar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Votre profil RAISEC</CardTitle>
                  <CardDescription>
                    Ce graphique représente l'importance relative de chaque type RAISEC dans votre profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={raisecData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <Radar
                        name="Valeurs"
                        dataKey="value"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Colonne droite - Résultats */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Type dominant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className="bg-orientpro-blue text-white mb-2">{dominantType}</Badge>
                    <p className="font-medium">{descriptions.dominant.short}</p>
                    <p className="text-sm text-gray-600 mt-2">{descriptions.dominant.long}</p>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="border-orientpro-blue text-orientpro-blue mb-2">
                      {secondaryType}
                    </Badge>
                    <p className="font-medium">{descriptions.secondary.short}</p>
                    <p className="text-sm text-gray-600 mt-2">{descriptions.secondary.long}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-2">
                  <Button variant="outline" className="w-full justify-between">
                    Télécharger les résultats
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    Partager
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Interprétation détaillée */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Interprétation détaillée</CardTitle>
              <CardDescription>
                Comprendre votre type de personnalité professionnelle RAISEC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Votre combinaison {dominantType}-{secondaryType}</h3>
                  <p className="text-gray-700">
                    Votre profil montre une dominante {dominantType.toLowerCase()} avec une forte présence du type {secondaryType.toLowerCase()}. 
                    Cette combinaison suggère que vous aimez {dominantType === "Investigateur" ? "analyser et résoudre des problèmes complexes" : 
                    dominantType === "Réaliste" ? "travailler de façon concrète et pratique" : 
                    dominantType === "Artistique" ? "exprimer votre créativité et votre originalité" : 
                    dominantType === "Social" ? "aider et travailler avec les autres" : 
                    dominantType === "Entreprenant" ? "prendre des initiatives et influencer votre environnement" : 
                    "travailler dans un cadre organisé et structuré"}, tout en accordant de l'importance à la dimension {secondaryType.toLowerCase()}.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Environnements de travail adaptés</h3>
                  <p className="text-gray-700 mb-3">
                    Vous vous épanouirez probablement dans des environnements qui valorisent:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {dominantType === "Réaliste" && (
                      <>
                        <li>Des activités pratiques et concrètes</li>
                        <li>L'utilisation d'outils et de technologies</li>
                        <li>Des résultats tangibles</li>
                      </>
                    )}
                    {dominantType === "Investigateur" && (
                      <>
                        <li>L'analyse et la résolution de problèmes</li>
                        <li>La recherche et l'investigation</li>
                        <li>L'autonomie intellectuelle</li>
                      </>
                    )}
                    {dominantType === "Artistique" && (
                      <>
                        <li>L'expression créative et originale</li>
                        <li>Des approches non-conventionnelles</li>
                        <li>L'esthétique et l'innovation</li>
                      </>
                    )}
                    {dominantType === "Social" && (
                      <>
                        <li>Les interactions humaines et le travail d'équipe</li>
                        <li>L'aide et le soutien aux autres</li>
                        <li>La communication et l'enseignement</li>
                      </>
                    )}
                    {dominantType === "Entreprenant" && (
                      <>
                        <li>Le leadership et l'initiative</li>
                        <li>La persuasion et l'influence</li>
                        <li>La réalisation d'objectifs ambitieux</li>
                      </>
                    )}
                    {dominantType === "Conventionnel" && (
                      <>
                        <li>L'organisation et la structure</li>
                        <li>La précision et l'attention aux détails</li>
                        <li>Les procédures claires et établies</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions de carrières */}
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">Prochaines étapes</h2>
            <p className="text-gray-600">
              En fonction de vos résultats, nous avons préparé des recommandations personnalisées pour vous aider dans votre orientation professionnelle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-orientpro-blue" />
                    Métiers recommandés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Découvrez les professions qui correspondent le mieux à votre profil RAISEC {dominantType}-{secondaryType}.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/careers" className="w-full">
                    <Button className="w-full">
                      Voir les métiers recommandés
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-orientpro-green" />
                    Parcours éducatifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Explorez les formations et établissements adaptés à vos intérêts et à votre profil.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/education" className="w-full">
                    <Button className="w-full" variant="outline">
                      Découvrir les parcours recommandés
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Import nécessaire pour éviter les erreurs de compilation
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GraduationCap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export default RaisecResults;

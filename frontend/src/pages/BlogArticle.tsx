
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, BookOpen, Share2, Bookmark } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { BlogArticle as BlogArticleType } from "@/types/diagnostics";

// Mock articles data
const mockArticles: Record<string, BlogArticleType> = {
  "1": {
    _id: "1",
    title: "Guide complet de préparation au concours ENSIAS 2023",
    content: `
      <h2>Introduction</h2>
      <p>Le concours de l'ENSIAS est l'un des concours les plus prestigieux du Maroc pour les étudiants souhaitant poursuivre une carrière dans l'ingénierie informatique. Chaque année, des milliers d'étudiants tentent leur chance pour intégrer cette école d'élite, mais seule une fraction d'entre eux réussit à franchir la ligne d'arrivée.</p>
      
      <p>Dans cet article, nous allons explorer les stratégies les plus efficaces pour préparer ce concours, en mettant l'accent sur les matières principales que sont les mathématiques et l'informatique. Nous allons également analyser les tendances des examens précédents pour mieux vous orienter dans votre préparation.</p>
      
      <h2>Comprendre le format du concours</h2>
      <p>Le concours ENSIAS se compose généralement de deux phases :</p>
      <ul>
        <li>Une présélection basée sur vos notes du CPGE ou du diplôme équivalent</li>
        <li>Un examen écrit comprenant des épreuves de mathématiques, d'informatique et parfois de culture générale</li>
        <li>Un entretien oral pour les candidats admissibles</li>
      </ul>
      
      <h2>Stratégies de préparation en mathématiques</h2>
      <p>Les mathématiques constituent la pierre angulaire du concours ENSIAS. Voici quelques conseils pour vous aider à vous préparer :</p>
      <ul>
        <li>Concentrez-vous sur l'algèbre linéaire, particulièrement les espaces vectoriels et les applications linéaires</li>
        <li>Maîtrisez le calcul différentiel et intégral, notamment les fonctions de plusieurs variables</li>
        <li>Pratiquez régulièrement avec des annales des années précédentes pour vous habituer au style des questions</li>
        <li>Apprenez à résoudre des problèmes sous contrainte de temps, car le concours est chronométré</li>
      </ul>
      
      <h2>Préparation en informatique</h2>
      <p>Si les mathématiques sont importantes, l'informatique ne l'est pas moins. Voici comment vous préparer efficacement :</p>
      <ul>
        <li>Maîtrisez l'algorithmique de base : structures de données, tri, recherche, etc.</li>
        <li>Pratiquez la programmation dans un langage courant comme Python ou C++</li>
        <li>Familiarisez-vous avec la complexité algorithmique et l'optimisation</li>
        <li>Entraînez-vous à résoudre des problèmes de programmation sur des plateformes comme HackerRank ou LeetCode</li>
      </ul>
      
      <h2>Analyse des tendances des examens précédents</h2>
      <p>L'analyse des examens des années précédentes révèle plusieurs tendances :</p>
      <ul>
        <li>Une augmentation constante de la complexité des problèmes d'algorithmique</li>
        <li>Un accent mis sur les applications pratiques des mathématiques</li>
        <li>Une préférence pour les questions testant la compréhension plutôt que la mémorisation</li>
      </ul>
      
      <h2>Planification de votre préparation</h2>
      <p>Une préparation efficace nécessite une planification rigoureuse. Nous vous recommandons de :</p>
      <ul>
        <li>Commencer votre préparation au moins 6 mois avant le concours</li>
        <li>Consacrer 2-3 heures par jour à l'étude</li>
        <li>Réviser régulièrement les concepts déjà appris</li>
        <li>Faire des simulations d'examen dans des conditions réelles</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>La préparation au concours ENSIAS demande du temps, de l'effort et une approche méthodique. En suivant les conseils proposés dans cet article, vous augmenterez considérablement vos chances de réussite. N'oubliez pas que la régularité dans le travail et la pratique constante sont les clés du succès.</p>
      
      <p>Bonne chance dans votre préparation !</p>
    `,
    summary: "Stratégies de préparation pour le concours ENSIAS avec focus sur les mathématiques et l'informatique.",
    category: "concours",
    school: "ENSIAS",
    imageUrl: "https://example.com/images/ensias.jpg",
    author: "Prof. Ahmed Alami",
    publishDate: new Date("2023-10-15"),
    tags: ["Concours", "ENSIAS", "Préparation", "CNC"]
  },
  "2": {
    _id: "2",
    title: "Les métiers d'avenir dans l'intelligence artificielle au Maroc",
    content: `
      <h2>Introduction</h2>
      <p>L'intelligence artificielle (IA) transforme rapidement le monde professionnel, et le Maroc n'est pas en reste dans cette révolution technologique. De plus en plus d'entreprises marocaines investissent dans l'IA, créant ainsi de nouvelles opportunités d'emploi dans ce domaine en pleine expansion.</p>
      
      <p>Dans cet article, nous explorerons les métiers émergents de l'IA au Maroc, les compétences nécessaires pour y accéder, et comment vous positionner stratégiquement dans ce marché en évolution rapide.</p>
      
      <h2>Les métiers phares de l'IA au Maroc</h2>
      
      <h3>Data Scientist</h3>
      <p>Le Data Scientist est un professionnel capable d'extraire des connaissances et des insights à partir de grandes quantités de données. Au Maroc, ce profil est particulièrement recherché dans les secteurs de la finance, des télécommunications et du e-commerce.</p>
      <p><strong>Compétences requises :</strong> maîtrise des statistiques, programmation (Python, R), machine learning, visualisation de données.</p>
      
      <h3>Ingénieur en Machine Learning</h3>
      <p>L'ingénieur en Machine Learning se concentre sur la création et l'optimisation d'algorithmes d'apprentissage automatique. Ce profil est essentiel pour les entreprises développant des solutions d'IA avancées.</p>
      <p><strong>Compétences requises :</strong> solides connaissances en programmation, frameworks de deep learning (TensorFlow, PyTorch), mathématiques avancées.</p>
      
      <h3>Spécialiste NLP (Natural Language Processing)</h3>
      <p>Avec l'essor des solutions basées sur le traitement du langage naturel, les spécialistes NLP sont très demandés, notamment pour développer des solutions adaptées à l'arabe dialectal marocain (Darija).</p>
      <p><strong>Compétences requises :</strong> linguistique computationnelle, programmation, compréhension approfondie des modèles de langage.</p>
      
      <h2>Formation et parcours académiques</h2>
      <p>Pour accéder à ces métiers prometteurs, plusieurs parcours de formation sont possibles au Maroc :</p>
      
      <h3>Formations universitaires</h3>
      <ul>
        <li>Master en Data Science à l'ENSIAS (Rabat)</li>
        <li>Filière IA à l'INPT (Rabat)</li>
        <li>Master Intelligence Artificielle à l'Université Mohammed VI Polytechnique (Benguerir)</li>
        <li>Filière Science des données à l'EMI (Rabat)</li>
      </ul>
      
      <h3>Formations continues et certifications</h3>
      <ul>
        <li>Certificat IBM en IA et Data Science</li>
        <li>Programme Microsoft AI-900</li>
        <li>Bootcamps intensifs proposés par des écoles comme Le Wagon ou DataScientest</li>
      </ul>
      
      <h2>Le marché de l'emploi IA au Maroc</h2>
      <p>Le marché de l'emploi dans le domaine de l'IA au Maroc présente plusieurs caractéristiques :</p>
      
      <h3>Secteurs recruteurs</h3>
      <ul>
        <li>Services financiers (banques, assurances)</li>
        <li>Télécommunications</li>
        <li>Consulting IT</li>
        <li>Startups technologiques</li>
        <li>Branches marocaines de multinationales (IBM, Microsoft, Accenture)</li>
      </ul>
      
      <h3>Rémunération</h3>
      <p>Les salaires dans le domaine de l'IA sont parmi les plus compétitifs du secteur IT au Maroc :</p>
      <ul>
        <li>Junior (0-2 ans d'expérience) : 8 000 - 15 000 MAD</li>
        <li>Confirmé (2-5 ans) : 15 000 - 25 000 MAD</li>
        <li>Senior (5+ ans) : 25 000 - 40 000+ MAD</li>
      </ul>
      
      <h2>Comment se préparer pour une carrière en IA</h2>
      
      <h3>Développer ses compétences techniques</h3>
      <p>Pour réussir dans le domaine de l'IA, il est essentiel de :</p>
      <ul>
        <li>Maîtriser les langages de programmation clés (Python en priorité)</li>
        <li>Se familiariser avec les bibliothèques et frameworks d'IA</li>
        <li>Comprendre les concepts mathématiques sous-jacents</li>
        <li>Développer des compétences en ingénierie des données</li>
      </ul>
      
      <h3>Construire un portfolio</h3>
      <p>Les employeurs valorisent les candidats capables de démontrer leurs compétences à travers des projets concrets :</p>
      <ul>
        <li>Créez un profil GitHub avec vos projets personnels</li>
        <li>Participez à des compétitions sur Kaggle</li>
        <li>Contribuez à des projets open-source</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>L'intelligence artificielle offre des perspectives de carrière passionnantes au Maroc, avec des opportunités dans divers secteurs et des rémunérations attractives. En investissant dans une formation solide et en développant continuellement vos compétences, vous pourrez vous positionner avantageusement dans ce domaine d'avenir.</p>
      
      <p>Le Maroc a le potentiel de devenir un hub régional pour l'IA, particulièrement avec sa position géographique stratégique entre l'Europe et l'Afrique. Les professionnels qui se spécialisent maintenant dans ce domaine seront les mieux placés pour saisir les opportunités de demain.</p>
    `,
    summary: "Panorama des carrières dans l'IA au Maroc et comment s'y préparer.",
    category: "métiers",
    imageUrl: "https://example.com/images/ai-careers.jpg",
    author: "Leila Benjelloun",
    publishDate: new Date("2023-11-20"),
    tags: ["IA", "Carrières", "Technologie", "Formation"]
  }
};

// Format for displaying the date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

const BlogArticle: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<BlogArticleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real application, this would be an API call
    const timer = setTimeout(() => {
      if (articleId && mockArticles[articleId]) {
        setArticle(mockArticles[articleId]);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [articleId]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-10 w-1/4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!article) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-6">L'article que vous cherchez n'existe pas ou a été supprimé.</p>
            <Link to="/blog">
              <Button>Retour au blog</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/blog" className="flex items-center text-orientpro-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux articles
            </Link>
          </div>
          
          <Card className="mb-8 border-0 shadow-none p-4">
            <CardHeader className="px-0">
              <Badge className="mb-2">
                {article.category === "concours" ? "Concours" :
                article.category === "métiers" ? "Métiers" :
                article.category === "international" ? "International" :
                "Conseils"}
              </Badge>
              <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {article.publishDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                )}
                
                {article.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Temps de lecture: {Math.ceil(article.content.length / 2000)} min</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="px-4">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-0 flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Sauvegarder
              </Button>
            </CardFooter>
          </Card>
          
          <div className="border-t pt-8 mt-10">
            <h2 className="text-xl font-semibold mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(mockArticles)
                .filter(item => item._id !== article._id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link to={`/blog/${relatedArticle._id}`} key={relatedArticle._id} className="block">
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardHeader>
                        <Badge className="mb-2">
                          {relatedArticle.category === "concours" ? "Concours" :
                          relatedArticle.category === "métiers" ? "Métiers" :
                          relatedArticle.category === "international" ? "International" :
                          "Conseils"}
                        </Badge>
                        <CardTitle className="text-lg">{relatedArticle.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedArticle.summary}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogArticle;

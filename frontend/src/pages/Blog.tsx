
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, User, BookOpen, ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { BlogArticle } from "@/types/diagnostics";
import { Link } from "react-router-dom";

// Données de démonstration pour les articles du blog
const mockArticles: BlogArticle[] = [
  {
    _id: "1",
    title: "Guide complet de préparation au concours ENSIAS 2023",
    content: "Dans cet article, nous présentons des stratégies de préparation pour le concours de l'École Nationale Supérieure d'Informatique et d'Analyse des Systèmes, en mettant l'accent sur les matières de mathématiques et d'informatique, ainsi que sur des exemples d'examens précédents.",
    summary: "Stratégies de préparation pour le concours ENSIAS avec focus sur les mathématiques et l'informatique.",
    category: "concours",
    school: "ENSIAS",
    imageUrl: "https://example.com/images/ensias.jpg",
    author: "Prof. Ahmed Alami",
    publishDate: new Date("2023-10-15"),
    tags: ["Concours", "ENSIAS", "Préparation", "CNC"]
  },
  {
    _id: "2",
    title: "Les métiers d'avenir dans l'intelligence artificielle au Maroc",
    content: "L'IA est en plein essor au Maroc avec des opportunités croissantes. Cet article explore les différentes carrières émergentes dans ce domaine, les compétences requises et comment s'y préparer efficacement pour le marché marocain en pleine évolution.",
    summary: "Panorama des carrières dans l'IA au Maroc et comment s'y préparer.",
    category: "métiers",
    imageUrl: "https://example.com/images/ai-careers.jpg",
    author: "Leila Benjelloun",
    publishDate: new Date("2023-11-20"),
    tags: ["IA", "Carrières", "Technologie", "Formation"]
  },
  {
    _id: "3",
    title: "Comment réussir ses études à l'étranger : bourses et conseils",
    content: "Étudier à l'étranger représente une opportunité exceptionnelle, mais comporte aussi des défis. Cet article fournit des conseils pratiques pour les étudiants marocains qui souhaitent poursuivre leurs études à l'international, y compris les programmes de bourses disponibles, les processus de candidature et des conseils pour s'adapter à une nouvelle culture.",
    summary: "Guide complet pour étudier à l'étranger pour les étudiants marocains.",
    category: "international",
    imageUrl: "https://example.com/images/study-abroad.jpg",
    author: "Karim Idrissi",
    publishDate: new Date("2023-12-05"),
    tags: ["Études à l'étranger", "Bourses", "Mobilité internationale"]
  },
  {
    _id: "4",
    title: "Techniques d'étude efficaces pour réussir ses examens",
    content: "La réussite aux examens ne dépend pas uniquement de l'intelligence ou des connaissances, mais aussi des méthodes d'étude. Cet article présente des techniques scientifiquement prouvées pour optimiser l'apprentissage, améliorer la mémorisation et réduire le stress avant les examens, avec des exemples adaptés au système éducatif marocain.",
    summary: "Méthodes d'apprentissage efficaces basées sur des recherches scientifiques.",
    category: "conseils",
    imageUrl: "https://example.com/images/study-techniques.jpg",
    author: "Dr. Fatima Zahra Meknassi",
    publishDate: new Date("2024-01-18"),
    tags: ["Méthodes d'étude", "Examens", "Apprentissage", "Mémorisation"]
  }
];

// Format de date pour l'affichage
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Filtrage des articles en fonction des critères
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Blog OrientPro</h1>
          <p className="text-gray-600 mb-8">
            Articles, conseils et actualités sur l'orientation et les formations
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="concours">Concours</SelectItem>
                  <SelectItem value="métiers">Métiers</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="conseils">Conseils</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres avancés
            </Button> */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredArticles.map((article) => (
              <Card key={article._id} className="h-full flex flex-col">
                <CardHeader>
                  <div>
                    <Badge className="mb-2">
                      {article.category === "concours" ? "Concours" :
                      article.category === "métiers" ? "Métiers" :
                      article.category === "international" ? "International" :
                      "Conseils"}
                    </Badge>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    {article.author && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700">{article.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Link to={"/blog/"+article._id}>
                  <Button variant="ghost" className="w-full flex justify-center items-center gap-2">
                    <span>Lire l'article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  </Link>
                  
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun article correspondant à vos critères de recherche.</p>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button variant="outline">Charger plus d'articles</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;

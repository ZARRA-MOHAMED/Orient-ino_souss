
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Filter, Search, GraduationCap, MapPin, Clock, School, BookOpen } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EducationSuggestion } from "@/types/diagnostics";

// Données de démonstration pour les suggestions d'établissements
const mockEducation: EducationSuggestion[] = [
  {
    _id: "1",
    title: "Université Mohammed V",
    website: "https://www.um5.ac.ma",
    cities: ["Rabat"],
    schoolType: "public",
    establishmentType: "university",
    fields: ["Sciences", "Lettres", "Droit", "Économie"],
    diplomaLevels: ["bachelor", "master", "phd", "deug"],
    requirements: [
      { filiere: "Sciences Juridiques", branch: "Droit Public" },
      { filiere: "Économie", branch: "Économie Appliquée" }
    ],
    admission: {
      requiresExam: false,
      minGrade: 10,
      processDescription: "L'admission est basée sur la moyenne du baccalauréat"
    },
    concours: [],
    isBoardingAvailable: false,
    isScholarshipAvailable: true,
    internationalPrograms: true
  },
  {
    _id: "2",
    title: "École Nationale Supérieure d'Informatique et d'Analyse des Systèmes",
    website: "https://www.ensias.ma",
    cities: ["Rabat"],
    schoolType: "public",
    establishmentType: "school",
    fields: ["Informatique", "Intelligence Artificielle", "Cybersécurité", "Data Science"],
    diplomaLevels: ["master", "ingénieur"],
    requirements: [
      { filiere: "Sciences Mathématiques", branch: "Sciences Mathématiques A" },
      { filiere: "Sciences Physiques", branch: "Sciences Physiques" }
    ],
    admission: {
      requiresExam: true,
      minGrade: 14,
      processDescription: "Concours national commun + entretien"
    },
    concours: [],
    isBoardingAvailable: true,
    isScholarshipAvailable: true,
    internationalPrograms: true
  },
  {
    _id: "3",
    title: "ISCAE - Institut Supérieur de Commerce et d'Administration des Entreprises",
    website: "https://www.iscae.ma",
    cities: ["Casablanca", "Rabat"],
    schoolType: "public",
    establishmentType: "institute",
    fields: ["Commerce", "Management", "Finance", "Marketing"],
    diplomaLevels: ["bachelor", "master"],
    requirements: [
      { filiere: "Sciences Économiques", branch: "Sciences Économiques et Gestion" },
      { filiere: "Baccalauréat", branch: "Toutes options" }
    ],
    admission: {
      requiresExam: true,
      minGrade: 14,
      processDescription: "Concours d'entrée + dossier académique"
    },
    concours: [],
    isBoardingAvailable: false,
    isScholarshipAvailable: false,
    internationalPrograms: true
  }
];

const personalitySummary = `
Selon vos résultats aux tests RAISEC et Big 5, vous présentez un profil investigateur-réaliste
avec une forte ouverture aux expériences nouvelles et une grande conscienciosité. Ces traits
suggèrent une affinité pour les formations techniques et scientifiques qui demandent de la
rigueur analytique, de la curiosité intellectuelle et un sens pratique.
`;

const Education: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Filtrage des établissements en fonction des critères
  const filteredEducation = mockEducation.filter(edu => {
    const matchesSearch = edu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          edu.fields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || edu.establishmentType === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Suggestions de parcours</h1>
          <p className="text-gray-600 mb-8">
            Découvrez les formations et établissements qui correspondent à votre profil
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Synthèse de votre profil</CardTitle>
              <CardDescription>Basée sur vos résultats de tests psychométriques</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{personalitySummary}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-orientpro-blue">Investigateur</Badge>
                <Badge variant="outline" className="border-orientpro-blue text-orientpro-blue">Réaliste</Badge>
                <Badge className="bg-orientpro-green">Ouverture élevée</Badge>
                <Badge className="bg-orientpro-indigo">Conscienciosité élevée</Badge>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un établissement ou domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type d'établissement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="university">Universités</SelectItem>
                  <SelectItem value="school">Écoles</SelectItem>
                  <SelectItem value="institute">Instituts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Plus de filtres
            </Button> */}
          </div>
          
          <Tabs defaultValue="recommended" className="mb-8">
            {/* <TabsList className="mb-6">
              <TabsTrigger value="recommended">Recommandés</TabsTrigger>
              <TabsTrigger value="all">Tous les établissements</TabsTrigger>
              <TabsTrigger value="saved">Sauvegardés</TabsTrigger>
            </TabsList> */}
            
            <TabsContent value="recommended" className="space-y-6">
              {filteredEducation.map((edu) => (
                <Card key={edu._id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl">{edu.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.cities.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={edu.schoolType === "public" ? "default" : "secondary"}>
                          {edu.schoolType === "public" ? "Public" : "Privé"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {edu.establishmentType === "university" ? "Université" : 
                           edu.establishmentType === "school" ? "École" : "Institut"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Domaines d'étude</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.fields.map((field, idx) => (
                          <Badge key={idx} variant="secondary">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Niveaux de diplôme</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.diplomaLevels.map((diploma, idx) => (
                          <Badge key={idx} variant="outline" className="capitalize">
                            {diploma}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          Admission: {edu.admission.requiresExam ? "Concours" : "Sur dossier"}
                        </span>
                      </div>
                      
                      {edu.isBoardingAvailable && (
                        <div className="flex items-center gap-1 text-sm">
                          <School className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Internat disponible</span>
                        </div>
                      )}
                      
                      {edu.isScholarshipAvailable && (
                        <div className="flex items-center gap-1 text-sm">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Bourses disponibles</span>
                        </div>
                      )}
                      
                      {edu.internationalPrograms && (
                        <div className="flex items-center gap-1 text-sm">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Programmes internationaux</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between items-center">
                    {/* <Button variant="outline" className="flex items-center gap-1">
                      Plus de détails
                    </Button> */}
                    
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orientpro-blue hover:text-orientpro-indigo flex items-center gap-1"
                    >
                      <span>Visiter le site</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredEducation.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucun établissement correspondant à vos critères.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="text-center py-10">
                <p className="text-gray-500">Liste de tous les établissements disponibles.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="text-center py-10">
                <p className="text-gray-500">Vous n'avez pas encore sauvegardé d'établissements.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Education;

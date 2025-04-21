
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BriefcaseIcon, Filter, Search } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { CareerSuggestion } from "@/types/diagnostics";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";


import {mockCareers ,personalitySummary} from "@/api/CareerApi";
// Données fictives de suggestions de carrières




const Careers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRiasec, setSelectedRiasec] = useState<string>("all");
  const [selectedCareer, setSelectedCareer] = useState<CareerSuggestion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Filtrer les carrières en fonction des critères de recherche
  const filteredCareers = mockCareers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiasec = selectedRiasec === "all" || career.riasecType === selectedRiasec;
    
    return matchesSearch && matchesRiasec;
  });

  // Ouvrir le dialogue avec les détails complets
  const openCareerDetails = (career: CareerSuggestion) => {
    setSelectedCareer(career);
    setDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Suggestions de métiers</h1>
          <p className="text-gray-600 mb-8">
            Découvrez les professions qui correspondent le mieux à votre profil
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
                {/* <Badge variant="outline" className="border-orientpro-blue text-orientpro-blue">Réaliste</Badge>
                <Badge className="bg-orientpro-green">Ouverture élevée</Badge>
                <Badge className="bg-orientpro-indigo">Conscienciosité élevée</Badge> */}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un métier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedRiasec} onValueChange={setSelectedRiasec}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type RAISEC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="realistic">Réaliste</SelectItem>
                  <SelectItem value="investigative">Investigateur</SelectItem>
                  <SelectItem value="artistic">Artistique</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="enterprising">Entreprenant</SelectItem>
                  <SelectItem value="conventional">Conventionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="recommended" className="mb-8">
             {/*<TabsList className="mb-6">
              <TabsTrigger value="recommended">Recommandés</TabsTrigger>
              <TabsTrigger value="all">Tous les métiers</TabsTrigger>
              <TabsTrigger value="saved">Sauvegardés</TabsTrigger>
            </TabsList> */}
            
            <TabsContent value="recommended" className="space-y-6">
              {filteredCareers.map((career) => (
                <Card key={career._id} className="orientpro-card">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{career.title}</CardTitle>
                        <CardDescription>{career.description}</CardDescription>
                      </div>
                      <div className="flex items-start">
                        <Badge className="capitalize">
                          {career.riasecType === "investigative" ? "Investigateur" :
                           career.riasecType === "artistic" ? "Artistique" :
                           career.riasecType === "realistic" ? "Réaliste" :
                           career.riasecType === "social" ? "Social" :
                           career.riasecType === "enterprising" ? "Entreprenant" : "Conventionnel"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {career.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Demande:</span>{" "}
                          <span className={`
                            ${career.jobMarket.demand === "HIGH" ? "text-green-600" : 
                              career.jobMarket.demand === "MEDIUM" ? "text-amber-600" : 
                              "text-gray-600"}
                          `}>
                            {career.jobMarket.demand === "HIGH" ? "Élevée" : 
                             career.jobMarket.demand === "MEDIUM" ? "Moyenne" : 
                             "Faible"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => openCareerDetails(career)}
                    >
                      <BriefcaseIcon className="h-4 w-4" />
                      Plus de détails
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredCareers.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucun métier correspondant à vos critères de recherche.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="text-center py-10">
                <p className="text-gray-500">Liste de tous les métiers disponibles.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="text-center py-10">
                <p className="text-gray-500">Vous n'avez pas encore sauvegardé de métiers.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Dialog pour afficher les détails complets */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              {selectedCareer && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedCareer.title}</DialogTitle>
                    <DialogDescription>{selectedCareer.description}</DialogDescription>
                    <div className="mt-2">
                      <Badge className="capitalize">
                        {selectedCareer.riasecType === "investigative" ? "Investigateur" :
                         selectedCareer.riasecType === "artistic" ? "Artistique" :
                         selectedCareer.riasecType === "realistic" ? "Réaliste" :
                         selectedCareer.riasecType === "social" ? "Social" :
                         selectedCareer.riasecType === "enterprising" ? "Entreprenant" : "Conventionnel"}
                      </Badge>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-5 mt-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Exemples de métiers</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.exampleJobs.map((job, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {job}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Formation requise</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {selectedCareer.requiredEducation.map((edu, idx) => (
                          <li key={idx}>{edu}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Établissements recommandés</h4>
                      <div className="space-y-2">
                        {selectedCareer.schools.map((school, idx) => (
                          <div key={idx} className="text-sm flex justify-between items-center">
                            <div>
                              <p className="font-medium">{school.school}</p>
                              <p className="text-gray-500">{school.cities.join(', ')}</p>
                            </div>
                            <a
                              href={school.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orientpro-blue hover:text-orientpro-indigo flex items-center gap-1"
                            >
                              <span className="text-xs">Site web</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Marché de l'emploi</h4>
                        <p className="text-sm">
                          <span className="font-medium">Demande:</span>{" "}
                          <span className={`
                            ${selectedCareer.jobMarket.demand === "HIGH" ? "text-green-600" : 
                              selectedCareer.jobMarket.demand === "MEDIUM" ? "text-amber-600" : 
                              "text-gray-600"}
                          `}>
                            {selectedCareer.jobMarket.demand === "HIGH" ? "Élevée" : 
                             selectedCareer.jobMarket.demand === "MEDIUM" ? "Moyenne" : 
                             "Faible"}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Salaire moyen:</span>{" "}
                          <span>{selectedCareer.jobMarket.averageSalary}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  );
};

export default Careers;

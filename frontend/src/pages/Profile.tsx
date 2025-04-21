
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

import SuggestionSection from "../components/SuggestionSection";

// Exemple de données de test pour la démonstration
const exampleTestResults = {
  "OCEAN": {
    Nevrosisme: "16.67%",
    Extraversion: "25.00%",
    Ouverture_esprit: "20.83%",
    Amabilite: "10.42%",
    Precision: "15.00%",
    Maitrise: "12.08%"
  },
  "RAISEC": {
    R: "16.67%",
    A: "25.00%",
    I: "20.83%",
    S: "10.42%",
    E: "15.00%",
    C: "12.08%"
  },
  SINCERE_ANXIETY: "moyenne",
  EXAMS_ANXIETY: "tres grand",
  FUTUR_ANXIETY: "tres grand",
  DEPRESSION: "un peut",
  SELF_ESTEEM: {
    familiale: "grand",
    scolaire: "tres petite",
    sociale: "petite",
  },
  INTERNET_ADDICTION: "un peut",
  PSYCHOLOGICAL_PRESSURE: "tres grand",
};

const profileSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(50),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(50),
  email: z.string().email("Adresse e-mail invalide"),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "L'âge doit être un nombre positif",
  }),
  education: z.string(),
});

// Exemple de données RAISEC pour la démonstration
const raisecData = [
  { subject: 'Réaliste', value: 80, fullMark: 100 },
  { subject: 'Investigateur', value: 60, fullMark: 100 },
  { subject: 'Artistique', value: 90, fullMark: 100 },
  { subject: 'Social', value: 50, fullMark: 100 },
  { subject: 'Entreprenant', value: 75, fullMark: 100 },
  { subject: 'Conventionnel', value: 40, fullMark: 100 },
];

// Exemple de données Big 5 pour la démonstration
const big5Data = [
  { name: 'Névrosisme', value: 30 },
  { name: 'Extraversion', value: 65 },
  { name: 'Ouverture', value: 80 },
  { name: 'Amabilité', value: 70 },
  { name: 'Conscienciosité', value: 85 },
];

// Configuration des couleurs pour les graphiques
const chartConfig = {
  raisec: {
    theme: { light: "#8B5CF6", dark: "#9b87f5" },
    label: "RAISEC"
  },
  big5: {
    theme: { light: "#1EAEDB", dark: "#33C3F0" },
    label: "Big 5"
  },
};

const Profile: React.FC = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@exemple.com",
      age: "25",
      education: "licence",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast.success("Profil mis à jour avec succès");
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - informations personnelles */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>Jean Dupont</CardTitle>
                <CardDescription>jean.dupont@exemple.com</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Âge</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau d'études</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un niveau" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="lycee">Lycée</SelectItem>
                                <SelectItem value="bac">Baccalauréat</SelectItem>
                                <SelectItem value="licence">Licence</SelectItem>
                                <SelectItem value="master">Master</SelectItem>
                                <SelectItem value="doctorat">Doctorat</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Mettre à jour le profil</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Colonne droite - résultats des tests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Résultats des Tests</CardTitle>
                <CardDescription>Aperçu de vos résultats de diagnostics</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="raisec">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="raisec">RAISEC</TabsTrigger>
                    <TabsTrigger value="big5">Big 5</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="raisec" className="space-y-4">
                    <div className="h-[350px]">
                      <ChartContainer config={chartConfig} className="h-full">
                        <RadarChart outerRadius="80%" data={raisecData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis domain={[0, 100]} />
                          <Radar
                            name="RAISEC"
                            dataKey="value"
                            stroke="var(--color-raisec)"
                            fill="var(--color-raisec)"
                            fillOpacity={0.6}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RadarChart>
                      </ChartContainer>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Votre profil RAISEC</h4>
                      <p className="text-sm text-gray-600">
                        Votre profil montre une forte tendance artistique et réaliste. Vous avez une bonne capacité à résoudre des problèmes concrets tout en utilisant votre créativité. Vous pourriez vous épanouir dans des domaines qui combinent ces aspects, comme l'architecture, le design industriel ou certaines formes d'ingénierie.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="big5" className="space-y-4">
                    <div className="h-[350px]">
                      <ChartContainer config={chartConfig} className="h-full">
                        <BarChart data={big5Data} layout="vertical">
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" width={120} />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="value"
                            name="Big 5"
                            fill="var(--color-big5)"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Votre profil Big 5</h4>
                      <p className="text-sm text-gray-600">
                        Vos scores élevés en Ouverture et Conscienciosité suggèrent que vous êtes curieux, créatif et organisé. Votre niveau d'Extraversion modérément élevé indique que vous appréciez les interactions sociales tout en ayant besoin de temps pour vous. Ces traits sont souvent présents chez les personnes qui réussissent dans les domaines créatifs structurés comme la recherche ou la gestion de projet dans les industries créatives.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Suggestions principales</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Métiers recommandés</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Architecte</li>
                          <li>Designer UX/UI</li>
                          <li>Ingénieur créatif</li>
                        </ul>
                        <Link to={"/careers"}>
                          <Button variant="link" className="p-0 mt-2 h-auto text-orientpro-blue">
                            Voir tous les métiers recommandés
                          </Button>
                        </Link>
                        
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Parcours scolaires</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>École d'architecture</li>
                          <li>École de design</li>
                          <li>Formation en ingénierie créative</li>
                        </ul>
                        <Link to={"/education"}>
                        <Button variant="link" className="p-0 mt-2 h-auto text-orientpro-blue">
                          Voir tous les parcours recommandés
                        </Button>
                        </Link>
                        
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="lg:col-span-2 flex justify-center mt-6">
            <div className="w-full max-w-4xl flex">
              <SuggestionSection testResults={exampleTestResults} />
            </div>
          </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

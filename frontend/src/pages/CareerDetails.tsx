
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, GraduationCap, MapPin, Users } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

// Example Career Detail Data
interface School {
  school: string;
  website: string;
  cities: string[];
}

interface CareerDetail {
  id: string;
  title: string;
  description: string;
  riasecType: string;
  exampleJobs: string[];
  tags: string[];
  requiredEducation: string[];
  schools: School[];
  jobMarket: {
    demand: 'LOW' | 'MEDIUM' | 'HIGH';
    averageSalary: string;
  };
}

// Mock data for career details
const mockCareerDetails: Record<string, CareerDetail> = {
  "software-engineer": {
    id: "software-engineer",
    title: "مهندس برمجيات",
    description: "يقوم مهندس البرمجيات بتصميم وتطوير وصيانة أنظمة وتطبيقات البرمجيات. يعمل على حل المشاكل المعقدة من خلال استخدام خوارزميات وهياكل بيانات متقدمة.",
    riasecType: "investigative",
    exampleJobs: ["مطور الواجهة الخلفية", "مطور الواجهة الأمامية", "مهندس Full-stack"],
    tags: ["برمجة", "تكنولوجيا", "تطوير"],
    requiredEducation: ["بكالوريوس في علوم الحاسوب", "دبلوم هندسة البرمجيات"],
    schools: [
      { school: "المدرسة الوطنية العليا للمعلوميات وتحليل النظم (ENSIAS)", website: "https://www.ensias.ma", cities: ["الرباط"] },
      { school: "المدرسة المحمدية للمهندسين (EMI)", website: "https://www.emi.ac.ma", cities: ["الرباط"] },
      { school: "جامعة الأخوين", website: "https://www.aui.ma", cities: ["إفران"] }
    ],
    jobMarket: {
      demand: "HIGH",
      averageSalary: "10,000-25,000 درهم (حديثي التخرج)"
    }
  },
  "data-scientist": {
    id: "data-scientist",
    title: "عالم بيانات",
    description: "يقوم عالم البيانات بتحليل وتفسير البيانات المعقدة باستخدام الخوارزميات والإحصاءات والذكاء الاصطناعي لاستخراج رؤى قيمة واتخاذ قرارات مستنيرة.",
    riasecType: "investigative",
    exampleJobs: ["محلل بيانات", "مهندس تعلم آلي", "أخصائي ذكاء اصطناعي"],
    tags: ["تحليل بيانات", "ذكاء اصطناعي", "إحصاء"],
    requiredEducation: ["ماجستير في علوم البيانات", "بكالوريوس في الرياضيات أو الإحصاء"],
    schools: [
      { school: "المعهد الوطني للإحصاء والاقتصاد التطبيقي (INSEA)", website: "https://www.insea.ac.ma", cities: ["الرباط"] },
      { school: "المدرسة المحمدية للمهندسين (EMI)", website: "https://www.emi.ac.ma", cities: ["الرباط"] },
      { school: "جامعة الأخوين", website: "https://www.aui.ma", cities: ["إفران"] }
    ],
    jobMarket: {
      demand: "HIGH",
      averageSalary: "15,000-30,000 درهم (حديثي التخرج)"
    }
  }
};

const CareerDetails: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const [career, setCareer] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real application, this would be an API call
    const timer = setTimeout(() => {
      if (careerId && mockCareerDetails[careerId]) {
        setCareer(mockCareerDetails[careerId]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [careerId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="h-40 bg-gray-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!career) {
    return (
      <MainLayout>
        <div className="container py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Métier non trouvé</h1>
            <p className="text-gray-600 mb-6">Nous n'avons pas trouvé le métier que vous cherchez.</p>
            <Link to="/careers">
              <Button>Retour aux métiers</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getRiasecTypeName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'realistic': return 'Réaliste';
      case 'investigative': return 'Investigateur';
      case 'artistic': return 'Artistique';
      case 'social': return 'Social';
      case 'enterprising': return 'Entreprenant';
      case 'conventional': return 'Conventionnel';
      default: return type;
    }
  };

  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case 'LOW': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Faible demande</Badge>;
      case 'MEDIUM': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Demande moyenne</Badge>;
      case 'HIGH': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Forte demande</Badge>;
      default: return null;
    }
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/careers" className="flex items-center text-orientpro-blue hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux métiers
            </Link>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{career.title}</CardTitle>
                  <Badge className="mb-2 capitalize">{getRiasecTypeName(career.riasecType)}</Badge>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  {getDemandBadge(career.jobMarket.demand)}
                  <span className="text-sm mt-2 text-gray-600">{career.jobMarket.averageSalary}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{career.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Exemples de postes</h3>
                <div className="flex flex-wrap gap-2">
                  {career.exampleJobs.map((job, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {job}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Compétences et domaines</h3>
                <div className="flex flex-wrap gap-2">
                  {career.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Formation requise</h3>
                <ul className="list-disc list-inside space-y-1">
                  {career.requiredEducation.map((education, index) => (
                    <li key={index} className="text-gray-700">{education}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Établissements recommandés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {career.schools.map((school, index) => (
                    <Card key={index} className="bg-gray-50">
                      <CardContent className="pt-4">
                        <h4 className="font-medium mb-1">{school.school}</h4>
                        <div className="text-sm text-gray-600 flex items-center mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {school.cities.join(', ')}
                        </div>
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-orientpro-blue hover:underline">
                          Visiter le site web
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Parcours de formation
              </Button>
              <Button className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Opportunités d'emploi
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métiers similaires</CardTitle>
              <CardDescription>D'autres métiers qui pourraient vous intéresser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(mockCareerDetails)
                  .filter(item => item.id !== career.id)
                  .slice(0, 2)
                  .map((similarCareer) => (
                    <Link to={`/careers/${similarCareer.id}`} key={similarCareer.id} className="block">
                      <Card className="hover:shadow-md transition-shadow h-full">
                        <CardHeader>
                          <CardTitle className="text-lg">{similarCareer.title}</CardTitle>
                          <Badge className="capitalize">{getRiasecTypeName(similarCareer.riasecType)}</Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm line-clamp-2">{similarCareer.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CareerDetails;

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, BriefcaseIcon, FileText, GraduationCap, BookOpen } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const Index: React.FC = () => {
  return (
    <MainLayout>
      {/* Section héro */}
      <section className="relative bg-gradient-to-r from-orientpro-blue to-orientpro-indigo text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Découvrez votre chemin professionnel idéal
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                OrientPro vous accompagne dans votre orientation avec des tests psychométriques 
                personnalisés et des recommandations adaptées à votre profil unique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" variant="outline" className="bg-white text-orientpro-blue hover:bg-gray-100">
                    Commencer maintenant
                  </Button>
                </Link>
                <Link to="/diagnostics">
                  <Button size="lg" variant="outline" className="bg-white text-orientpro-blue hover:bg-gray-100">
                    Explorer les tests
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-white/10 rounded-lg border border-white/20 shadow-xl"></div>
              {/* Image ou graphique à ajouter ici */}
              <video
                src="../../public/224245_large.mp4"
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
              ></video>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Section caractéristiques */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprendre pour mieux s'orienter</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre approche scientifique et personnalisée vous aide à découvrir des opportunités 
              professionnelles et académiques parfaitement adaptées à votre personnalité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="orientpro-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-orientpro-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-orientpro-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Tests de personnalité</h3>
                <p className="text-gray-600 mb-4">
                  Des diagnostics scientifiquement validés comme RAISEC et Big 5 pour révéler vos traits dominants.
                </p>
                <Link to="/diagnostics" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                  Découvrir les tests <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="orientpro-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-orientpro-green/10 rounded-lg flex items-center justify-center mb-4">
                  <BriefcaseIcon className="h-6 w-6 text-orientpro-green" />
                </div>
                <h3 className="text-xl font-medium mb-2">Suggestions de métiers</h3>
                <p className="text-gray-600 mb-4">
                  Des recommandations de carrières adaptées à votre profil psychologique et vos centres d'intérêt.
                </p>
                <Link to="/careers" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                  Explorer les métiers <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="orientpro-card">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-orientpro-amber/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-orientpro-amber" />
                </div>
                <h3 className="text-xl font-medium mb-2">Parcours scolaires</h3>
                <p className="text-gray-600 mb-4">
                  Des itinéraires éducatifs personnalisés pour vous guider vers les formations les plus adaptées.
                </p>
                <Link to="/education" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                  Découvrir les parcours <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section processus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Un processus simple et efficace pour vous aider à trouver votre voie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-orientpro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Créez votre compte</h3>
              <p className="text-gray-600">
                Inscrivez-vous gratuitement pour accéder à tous nos outils d'orientation.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-orientpro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Passez les tests</h3>
              <p className="text-gray-600">
                Complétez les diagnostics pour révéler vos traits de personnalité.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-orientpro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Recevez vos résultats</h3>
              <p className="text-gray-600">
                Explorez les analyses détaillées de vos forces et préférences.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-orientpro-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Découvrez vos options</h3>
              <p className="text-gray-600">
                Consultez les recommandations personnalisées de métiers et formations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section blog et ressources */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ressources et conseils</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des articles et guides pour vous accompagner dans votre orientation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="orientpro-card">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-orientpro-blue px-3 py-1 bg-orientpro-blue/10 rounded-full">
                      Orientation
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Comment choisir sa voie après le bac</h3>
                  <p className="text-gray-600 mb-4">
                    Les étapes clés pour prendre une décision éclairée sur votre avenir académique.
                  </p>
                  <Link to="/blog/1" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                    Lire l'article <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="orientpro-card">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-orientpro-green px-3 py-1 bg-orientpro-green/10 rounded-full">
                      Carrière
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Les métiers d'avenir en 2025</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez les secteurs en pleine croissance et les compétences recherchées.
                  </p>
                  <Link to="/blog/2" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                    Lire l'article <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="orientpro-card">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-orientpro-amber px-3 py-1 bg-orientpro-amber/10 rounded-full">
                      Concours
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Préparer efficacement les concours d'entrée</h3>
                  <p className="text-gray-600 mb-4">
                    Stratégies et conseils pour réussir vos concours d'admission aux grandes écoles.
                  </p>
                  <Link to="/blog/3" className="inline-flex items-center text-orientpro-blue hover:text-orientpro-blue/80">
                    Lire l'article <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                Voir tous les articles <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-orientpro-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à découvrir votre potentiel?</h2>
          <p className="text-lg opacity-90 mb-8">
            Rejoignez les milliers d'étudiants qui ont trouvé leur voie grâce à OrientPro
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-orientpro-blue hover:bg-gray-100">
              Démarrer mon parcours
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

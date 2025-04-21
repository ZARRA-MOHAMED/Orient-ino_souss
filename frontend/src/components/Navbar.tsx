
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, BookOpen, BarChart2, BriefcaseIcon, GraduationCap, Home } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Pour une démonstration, nous définissons isLoggedIn à true
  // Dans une implémentation réelle, vous utiliseriez un contexte d'authentification
  // TODO: this is the is loggedIN
  const isLoggedIn = true;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dans une implémentation réelle, vous appelleriez ici votre fonction de déconnexion
    console.log("Déconnexion");
    // Redirection vers la page d'accueil après déconnexion
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-orientpro-blue rounded-md p-1 mr-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">OrientPro</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "flex items-center")}>
                    <Home className="h-4 w-4 mr-1" />
                    Accueil
                  </Link>
                </NavigationMenuItem>
                
                {isLoggedIn && (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="flex items-center">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        Diagnostics
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/diagnostics" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">Tous les tests</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Découvrez tous nos tests d'orientation
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/diagnostics/raisec" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">RAISEC</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Identifiez vos intérêts professionnels
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/diagnostics/ocean" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">Big Five (OCEAN)</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Évaluez vos traits de personnalité
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link to="/diagnostics/anxiety" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">Anxiété</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Mesurez votre niveau d'anxiété
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/careers" className={cn(navigationMenuTriggerStyle(), "flex items-center")}>
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        Métiers
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/education" className={cn(navigationMenuTriggerStyle(), "flex items-center")}>
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Parcours
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <Link to="/blog" className={cn(navigationMenuTriggerStyle(), "flex items-center")}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Blog
                      </Link>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem className="ml-4 flex items-center">
                      <Link to="/profile" className="text-gray-700 hover:text-orientpro-blue pl-3 pr-1 py-2">
                        <User className="h-5 w-5" />
                      </Link>
                      <Button variant="ghost" size="sm" className="text-gray-700" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </NavigationMenuItem>
                  </>
                )}
                
                {!isLoggedIn && (
                  <div className="ml-4 flex items-center space-x-2">
                    <Link to="/login">
                      <Button variant="outline" size="sm">Se connecter</Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm">S'inscrire</Button>
                    </Link>
                  </div>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Bouton menu mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} animate-fade-in`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/diagnostics" 
                className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Diagnostics
              </Link>
              <Link 
                to="/careers" 
                className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Métiers
              </Link>
              <Link 
                to="/education" 
                className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Parcours
              </Link>
              <Link 
                to="/blog" 
                className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/profile" 
                className="block text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Profil
              </Link>
              <button 
                className="w-full text-left text-gray-700 hover:text-orientpro-blue px-3 py-2 rounded-md text-base font-medium"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-center">Se connecter</Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center">S'inscrire</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

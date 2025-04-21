
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-10 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-gray-900">OrientPro</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Votre plateforme d'orientation professionnelle personnalisée. Découvrez votre potentiel et trouvez votre chemin grâce à nos diagnostics et conseils adaptés.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-orientpro-blue text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/diagnostics" className="text-gray-600 hover:text-orientpro-blue text-sm">
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-orientpro-blue text-sm">
                  Métiers
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-orientpro-blue text-sm">
                  Parcours
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-orientpro-blue text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Rue de l'Orientation, Quartier El Hoda Agadir</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">contact@orientpro.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">+212 612345678</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} OrientPro. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { CareerSuggestion } from "@/types/diagnostics";

export const mockCareers: CareerSuggestion[] = [
  {
    _id: "1",
    title: "Ingénieur logiciel",
    description: "Conçoit, développe et maintient des applications et systèmes informatiques.",
    riasecType: "investigative",
    exampleJobs: ["Développeur backend", "Développeur frontend", "Ingénieur Full-stack"],
    tags: ["Programmation", "Technologie", "Développement"],
    requiredEducation: ["Licence en informatique", "Master en génie logiciel"],
    schools: [
      { school: "École Nationale Supérieure d'Informatique", website: "https://www.ensi.ma", cities: ["Rabat"] },
      { school: "École Mohammedia d'Ingénieurs", website: "https://www.emi.ac.ma", cities: ["Rabat"] },
      { school: "Université Al Akhawayn", website: "https://www.aui.ma", cities: ["Ifrane"] }
    ],
    jobMarket: {
      demand: "HIGH",
      averageSalary: "10,000-25,000 MAD (junior)"
    }
  },
  {
    _id: "2",
    title: "Architecte",
    description: "Conçoit des bâtiments et des espaces en combinant aspects techniques et artistiques.",
    riasecType: "artistic",
    exampleJobs: ["Architecte d'intérieur", "Architecte paysagiste", "Urbaniste"],
    tags: ["Design", "Construction", "Créativité"],
    requiredEducation: ["Diplôme d'État d'Architecte", "Master en architecture"],
    schools: [
      { school: "École Nationale d'Architecture", website: "https://www.ena.archi.ac.ma", cities: ["Rabat", "Fès", "Tétouan"] },
      { school: "UIR - École d'Architecture", website: "https://www.uir.ac.ma", cities: ["Rabat"] }
    ],
    jobMarket: {
      demand: "MEDIUM",
      averageSalary: "12,000-20,000 MAD (junior)"
    }
  },
  {
    _id: "3",
    title: "Médecin",
    description: "Diagnostique et traite les maladies, blessures et autres problèmes de santé.",
    riasecType: "investigative",
    exampleJobs: ["Médecin généraliste", "Chirurgien", "Pédiatre", "Cardiologue"],
    tags: ["Santé", "Sciences", "Soins"],
    requiredEducation: ["Doctorat en médecine", "Spécialisation médicale"],
    schools: [
      { school: "Faculté de Médecine et de Pharmacie Rabat", website: "https://fmpr.um5.ac.ma", cities: ["Rabat"] },
      { school: "Faculté de Médecine et de Pharmacie Casablanca", website: "https://fmpc.ac.ma", cities: ["Casablanca"] }
    ],
    jobMarket: {
      demand: "HIGH",
      averageSalary: "15,000-30,000 MAD (début de carrière)"
    }
  }
];


export const personalitySummary = `
D'après vos résultats aux tests RAISEC et Big 5, vous présentez un profil investigateur-réaliste
avec une forte ouverture aux expériences nouvelles et une grande conscienciosité. Ces traits
suggèrent une affinité pour les métiers techniques et scientifiques qui demandent de la
rigueur analytique, de la curiosité intellectuelle et un sens pratique.
`;
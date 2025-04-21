import filiereData from '../../data/parcourScholaire/filiere.json';
import { Filiere } from '../../models/filiereModel';

const seedFiliere = async () => {
  try {
    // Clear existing filieres
    await Filiere.deleteMany({});

    // Insert new filieres
    const filieres = filiereData.map((item: any) => ({
      title: item.title,
    }));

    await Filiere.insertMany(filieres);

    console.log(`✅ Seeded ${filieres.length} filieres successfully.`);
  } catch (error) {
    console.error('❌ Error seeding filieres:', error);
  }
};

export default seedFiliere;

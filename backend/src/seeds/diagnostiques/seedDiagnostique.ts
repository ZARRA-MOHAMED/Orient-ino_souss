import diag from '../../data/diagnostiques/diagnostiques.json';
import { Diagnostique, IDiagnostiqueSchema } from '../../models/diagnostiqueModel';

const seedDiag = async () => {
  try {
    Diagnostique.deleteMany({});

    const questionDocs = diag.map(
      (item: Pick<IDiagnostiqueSchema, 'diagnostique' | 'description' | 'objectif'>) => ({
        diagnostique: item.diagnostique,
        description: item.description,
        objectif: item.objectif,
      })
    );

    await Diagnostique.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} ANXIETE_FUTURE questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding ANXIETE_FUTURE questions:', error);
  }
};


export default seedDiag;


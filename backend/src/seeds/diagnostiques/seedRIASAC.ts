import riasecData from '../../data/diagnostiques/riasecData.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName, IDiagnostique } from '../../types/diagnostiqueTypes';

const seedRIASEC = async () => {
  try {
    const diag = await Diagnostique.findOne({ diagnostique: DiagnostiqueName.RAISEC });

    if (!diag) {
      console.error('❌ Diagnostique not found with given ID');
      return;
    }

    // Check if the diagnostique exists
    

    if (diag.diagnostique !== DiagnostiqueName.RAISEC) {
      console.error('❌ Diagnostique is not RIASEC');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = riasecData.map(
      (
        item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'chaine' | 'options'>
      ) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        chaine: item.chaine, // corrected: use axis for RIASEC
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} RIASEC questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding RIASEC questions:', error);
  }
};

export default seedRIASEC;

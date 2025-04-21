import examanStress from '../../data/diagnostiques/examStress.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedANXIETE_EXAMENS = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.ANXIETE_EXAMENS,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.ANXIETE_EXAMENS) {
      console.error('❌ Diagnostique is not ANXIETE_EXAMENS');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = examanStress.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} ANXIETE_EXAMENS questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding ANXIETE_EXAMENS questions:', error);
  }
};

export default seedANXIETE_EXAMENS;

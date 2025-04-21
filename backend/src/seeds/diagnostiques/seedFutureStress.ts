import futureStress from '../../data/diagnostiques/futurStress.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedAnxieteFuture = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.ANXIETE_FUTUR,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.ANXIETE_FUTUR) {
      console.error('❌ Diagnostique is not ANXIETE_FUTURE');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = futureStress.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} ANXIETE_FUTURE questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding ANXIETE_FUTURE questions:', error);
  }
};

export default seedAnxieteFuture;

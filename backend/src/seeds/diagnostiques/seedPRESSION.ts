import pression from '../../data/diagnostiques/pression.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedPRESSION = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.PRESSION_PSYCHOLOGIQUE,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.PRESSION_PSYCHOLOGIQUE) {
      console.error('❌ Diagnostique is not PRESSION');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = pression.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'axis' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        axis: item.axis, // corrected: use axis for RIASEC
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} PRESSION questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding PRESSION questions:', error);
  }
};

export default seedPRESSION;

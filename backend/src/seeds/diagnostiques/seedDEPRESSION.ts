import depressionData from '../../data/diagnostiques/depressionData.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedDEPRESSION = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.DEPRESSION,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !==  DiagnostiqueName.DEPRESSION) {
      console.error('❌ Diagnostique is not Depretion');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = depressionData.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'axis' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        axis: item.axis, // corrected: use axis for RIASEC
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} OCEAN questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding Depression questions:', error);
  }
};

export default seedDEPRESSION;

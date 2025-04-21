import internetAddiction from '../../data/diagnostiques/internetAddiction.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedINTERENETADDICTION = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.DEPENDANCE_INTERNET,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.DEPENDANCE_INTERNET) {
      console.error('❌ Diagnostique is not INTERNET-ADDICTION');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = internetAddiction.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'axis' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        axis: item.axis, // corrected: use axis for RIASEC
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} INTERNET-ADDICTION questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding INTERNET-ADDICTION questions:', error);
  }
};

export default seedINTERENETADDICTION;

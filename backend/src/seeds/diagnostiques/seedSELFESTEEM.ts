import selfEsteem from '../../data/diagnostiques/selfEsteem.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedSELFESTEEM = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.ESTIME_DE_SOI,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.ESTIME_DE_SOI) {
      console.error('❌ Diagnostique is not SELF-ESTEEM');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = selfEsteem.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'axis' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        axis: item.axis, // corrected: use axis for RIASEC
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} SELF-ESTEEM questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding SELF-ESTEEM questions:', error);
  }
};

export default seedSELFESTEEM;

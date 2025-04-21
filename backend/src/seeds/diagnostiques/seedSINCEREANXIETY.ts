import sincereAnxiety from '../../data/diagnostiques/sincereAnxiety.json';
import { Diagnostique } from '../../models/diagnostiqueModel';
import { IQuestionSchema, Question } from '../../models/questionModel';
import { DiagnostiqueName } from '../../types/diagnostiqueTypes';

const seedSINCEREANXIETY = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.ANXIETE_SINCERE,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    if (diag.diagnostique !== DiagnostiqueName.ANXIETE_SINCERE) {
      console.error('❌ Diagnostique is not SINCERE-ANXIETY');
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = sincereAnxiety.map(
      (item: Pick<IQuestionSchema, 'name' | 'diagnostique' | 'question' | 'options'>) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(`✅ Seeded ${questionDocs.length} SINCERE-ANXIETY questions successfully.`);
  } catch (error) {
    console.error('❌ Error seeding SINCERE-ANXIETY questions:', error);
  }
};

export default seedSINCEREANXIETY;

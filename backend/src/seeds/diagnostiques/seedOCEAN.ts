import questionsOCEAN from "../../data/diagnostiques/questionsOCEAN.json";
import { Diagnostique } from "../../models/diagnostiqueModel";
import { IQuestionSchema, Question } from "../../models/questionModel";
import { DiagnostiqueName } from "../../types/diagnostiqueTypes";

const seedOCEAN = async () => {
  try {
    const diag = await Diagnostique.findOne({
      diagnostique: DiagnostiqueName.OCEAN,
    });

    if (!diag) {
      console.error("❌ Diagnostique not found with given ID");
      return;
    }

    // Check if the diagnostique exists

    if (diag.diagnostique !== DiagnostiqueName.OCEAN) {
      console.error("❌ Diagnostique is not OCEAN");
      return;
    }

    // Remove existing questions if needed (optional)
    await Question.deleteMany({ diagnostique: diag._id });

    const questionDocs = questionsOCEAN.map(
      (
        item: Pick<
          IQuestionSchema,
          "name" | "diagnostique" | "question" | "axis" | "options"
        >
      ) => ({
        name: item.name,
        diagnostique: diag._id,
        question: item.question,
        axis: item.axis,
        options: item.options,
      })
    );

    await Question.insertMany(questionDocs);
    console.log(
      `✅ Seeded ${questionDocs.length} OCEAN questions successfully.`
    );
  } catch (error) {
    console.error("❌ Error seeding OCEAN questions:", error);
  }
};

export default seedOCEAN;

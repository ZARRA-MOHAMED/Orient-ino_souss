import { model, Schema, Document } from 'mongoose';
import { IGrade, ECycle } from '../types/gradeTypes';
import { EFiliere } from '../types/filiereTypes';

interface IGradeSchema extends IGrade, Document {}

const gradeSchema = new Schema<IGradeSchema>({
  title: {
    type: String,
    enum: ['2 eme bac'],
  },
  cycle: {
    type: String,
    enum: Object.values(ECycle),
  },
  filiere: {
    type: String,
    enum: Object.values(EFiliere),
  },
  branch: {
    type: String,
    // enum: Object.values(Bra),
  },
});

const Grade = model<IGradeSchema>('Grade', gradeSchema);

export { IGradeSchema, Grade };

import { model, Schema, Document } from 'mongoose';
import { IFiliere, EFiliere } from '../types/filiereTypes';

interface IFiliereSchema extends IFiliere, Document {}

const filiereSchema = new Schema<IFiliereSchema>({
  title: {
    type: String,
    enum: Object.values(EFiliere),
  },
});

const Filiere = model<IFiliereSchema>('Filiere', filiereSchema);

export { IFiliereSchema, Filiere };

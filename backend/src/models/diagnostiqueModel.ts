import { model, Schema, Document } from 'mongoose';
import { IDiagnostique } from '../types/diagnostiqueTypes';

interface IDiagnostiqueSchema extends IDiagnostique, Document {}

const diagnostiqueSchema = new Schema<IDiagnostiqueSchema>({
  diagnostique: {
    type: String,
    required: true, 
    unique: true 
  },
  description: {
    type: String,
    required: true,
  },
  objectif: {
    type: String,
    required: true,
  },
});

const Diagnostique = model<IDiagnostiqueSchema>('Diagnostique', diagnostiqueSchema);

export { IDiagnostiqueSchema, Diagnostique };

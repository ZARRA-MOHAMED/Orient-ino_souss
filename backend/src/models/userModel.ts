import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import { EGender, ERole, IUser } from '../types/authTypes';

interface IUserSchema extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserSchema>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: EGender, required: true },
  role: {
    type: String,
    enum: ERole,
    default: ERole.STUDENT,
    required: true,
  },
  profilePicture: { type: Buffer },
  mimeType:{type:String},
  nivauxScolaire: {
    type: String,
    required: function (this: IUserSchema) {
      return this.role === ERole.STUDENT;
    },
  },
  filiere:{type:String},
  branche:{type:String},
  riasec: { type: Object}
});

userSchema.pre<IUserSchema>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUserSchema>('User', userSchema);

export { IUserSchema, User };

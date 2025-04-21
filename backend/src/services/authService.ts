import { IUser } from '../types/authTypes';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError';
import { IUserSchema } from '../models/userModel';

const getUserById = async (id: string): Promise<IUserSchema> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const getUserByEmail = async (email: string): Promise<IUserSchema> => {
  const user = await User.findOne({ email });
  return user;
};

const createUser = async (data: IUser) => {
  const user = await User.create({
    ...data,
  });
  await user.save();
  return user;
};

const ModifieUser = async (id: string, data: IUserSchema): Promise<IUserSchema> => {
  const ExistingUser = await User.findOne({ id });
  if (!ExistingUser) {
    throw new ApiError(404, 'There Is No User');
  }
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
};
const ModifiePassowrd = async (id: string, newPassword: string): Promise<Object> => {
  let user = await User.findOne({ password: newPassword });
  if (!user) {
    throw new ApiError(404, 'There Is No User');
  }
  user = await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
  return { msg: 'Modifie Password Successsfully' };
};
const deleteUser = async (id: string): Promise<Object> => {
  const user = await User.findByIdAndDelete(id);
  return { msg: 'User Deleted Successfully' };
};
export { getUserById, getUserByEmail, createUser, ModifieUser, ModifiePassowrd, deleteUser };

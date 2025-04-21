
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  education?: string;
  profileImage?: string;
  testsTaken: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

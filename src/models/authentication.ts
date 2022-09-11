export interface User {
  id: string;
  name: string;
  photoUrl: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

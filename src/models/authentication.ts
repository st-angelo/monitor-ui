export interface UserPreferences {
  baseCurrencyId: string;
}

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  isVerified: boolean;
  avatarUrl: string;
  preferences: UserPreferences;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token?: string;
  password: string;
}

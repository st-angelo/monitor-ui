import { ForgotPasswordData, ResetPasswordData, SignInData, SignUpData, User } from '../models/authentication';
import axios from '../utils/axios';

export const getUser = async () => {
  const response = await axios.get<User>('/user');
  return response.data;
};

export const signIn = async (input: SignInData) => {
  const response = await axios.post<User>('/signin', input);
  return response.data;
};

export const signUp = async (input: SignUpData) => {
  const response = await axios.post<User>('/signup', input);
  return response.data;
};

export const signOut = () => {
  return axios.post('/signout');
};

export const forgotPassword = (input: ForgotPasswordData) => {
  return axios.post('/forgotPassword', input);
};

export const resetPassword = async ({ token, ...rest }: ResetPasswordData) => {
  const response = await axios.patch<User>(`/resetPassword/${token}`, rest);
  return response.data;
}
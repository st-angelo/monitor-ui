import { SignInData, SignUpData, User } from '../models/authentication';
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

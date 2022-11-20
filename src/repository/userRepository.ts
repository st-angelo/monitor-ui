import { UpdateAccountData, UpdatePasswordData } from '../models/userProfile';
import axios from '../utils/axios';

export const updatePassword = (input: UpdatePasswordData) => {
  return axios.patch('/user/updatePassword', input);
};

export const updateAccountData = (input: UpdateAccountData) => {
  const formData = new FormData();
  formData.append('name', input.name ?? '');
  formData.append('nickname', input.nickname ?? '');
  formData.append('baseCurrencyId', input.baseCurrencyId ?? '');
  formData.append('avatar', input.avatar ?? '');
  return axios.patch('/user/updateAccountData', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

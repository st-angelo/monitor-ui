import { email, maxLength, required, stopOnFirstFailure } from '../utils/validation';
import { GetCollectionParams } from './common';

export interface MutateCategoryData {
  id?: string;
  name?: string;
  code?: string;
  description?: string | null;
  transactionTypeId?: string;
  color?: string;
}

export interface GetCategoriesParams extends GetCollectionParams {
  name: string;
  description: string;
  transactionTypeId: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateAccountData {
  email: string;
  name: string;
  nickname?: string;
  avatar?: File | null;
  baseCurrencyId?: string;
}

export const accountDataValidate = {
  email: stopOnFirstFailure([required, email]),
  name: stopOnFirstFailure([required, maxLength(100)]),
  nickname: maxLength(20),
  baseCurrencyId: required,
};
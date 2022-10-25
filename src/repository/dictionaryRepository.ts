import { Category, Currency } from '../models/common';
import { TransactionType } from '../models/transaction';
import axios from '../utils/axios';

export const getTransactionTypes = async () => {
  const response = await axios.get<TransactionType[]>('/dictionary/transactionType');
  return response.data;
}

export const getCategories = async () => {
  const response = await axios.get<Category[]>('/dictionary/category');
  return response.data;
};

export const getCurrencies = async () => {
  const response = await axios.get<Currency[]>('/dictionary/currency');
  return response.data;
};
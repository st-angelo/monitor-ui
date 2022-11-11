import { CollectionResponse } from '../models/common';
import {
  MutateTransactionData,
  GetTransactionsParams,
  Transaction,
  TransactionForSummary,
} from '../models/transaction';
import axios from '../utils/axios';

export const getTransactions = async ({
  dateFrom,
  dateTo,
  categoryId,
  currencyId,
  amountFrom,
  amountTo,
  orderBy,
  direction,
  page,
  size,
}: GetTransactionsParams) => {
  const response = await axios.get<CollectionResponse<Transaction>>(
    `/transaction?dateFrom=${dateFrom || ''}&dateTo=${
      dateTo || ''
    }&categoryId=${categoryId || ''}&currencyId=${
      currencyId || ''
    }&amountFrom=${amountFrom || 0}&amountTo=${amountTo || ''}&$orderBy=${
      orderBy || ''
    }&$direction=${direction || ''}&$page=${page || ''}&$size=${size || ''}`
  );
  return response.data;
};

export const getTransactionsForSummary = async (
  dateFrom: Date,
  dateTo: Date
) => {
  const response = await axios.get<TransactionForSummary[]>(
    `/transaction/summary?dateFrom=${dateFrom || ''}&dateTo=${dateTo || ''}`
  );
  return response.data;
};

export const addTransaction = (input: MutateTransactionData) => {
  return axios.post('/transaction', { ...input });
};

export const updateTransaction = (input: MutateTransactionData) => {
  return axios.patch(`/transaction/${input.id}`, { ...input });
};

export const deleteTransaction = (transactionId: string) => {
  return axios.delete(`/transaction/${transactionId}`);
};

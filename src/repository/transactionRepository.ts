import { CollectionResponse } from '../models/common';
import {
  GetTransactionsParams,
  LatestTransactionData,
  MutateTransactionData,
  Transaction,
  TransactionForSummary,
} from '../models/transaction';
import axios from '../utils/axios';

export const getTransactions = async ({
  dateFrom,
  dateTo,
  typeId,
  categoryId,
  currencyId,
  amountFrom,
  amountTo,
  isRecurrent,
  orderBy,
  direction,
  page,
  size,
}: GetTransactionsParams) => {
  const response = await axios.get<CollectionResponse<Transaction>>(
    `/transaction?dateFrom=${dateFrom || ''}&dateTo=${dateTo || ''}&typeId=${
      typeId || ''
    }&categoryId=${categoryId || ''}&currencyId=${
      currencyId || ''
    }&amountFrom=${amountFrom || 0}&amountTo=${
      amountTo || ''
    }&isRecurrent=${isRecurrent}&$orderBy=${orderBy || ''}&$direction=${
      direction || ''
    }&$page=${page || ''}&$size=${size || ''}`
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

export const getLatestTransactionData = async () => {
  const response = await axios.get<LatestTransactionData>(
    '/transaction/latest'
  );
  return response.data;
};

export const addTransaction = (input: MutateTransactionData) => {
  return axios.post('/transaction', input);
};

export const updateTransaction = (input: MutateTransactionData) => {
  return axios.patch(`/transaction/${input.id}`, input);
};

export const deleteTransaction = (id: string) => {
  return axios.delete(`/transaction/${id}`);
};

export const deleteTransactions = (ids: string[]) => {
  return axios.delete('/transaction', { data: { ids } });
};
